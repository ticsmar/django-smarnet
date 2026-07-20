import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Monitor } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApp } from "@/contexts/AppContext";
import { useT } from "@/hooks/useT";
import { DeviceApiError, createToken, listTokens, revokeToken } from "../api/deviceApi";
import type { AccessToken, CreatedAccessToken } from "../types/accessToken";

export function DeviceTokensPage() {
  const t = useT();
  const { locale } = useApp();
  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdToken, setCreatedToken] = useState<CreatedAccessToken | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [revokingId, setRevokingId] = useState<number | null>(null);

  function formatDate(value: string | null): string {
    if (!value) {
      return "—";
    }
    return new Date(value).toLocaleString(locale);
  }

  function statusLabel(status: string): string {
    return status === "active"
      ? t("devices.status.active")
      : t("devices.status.revoked");
  }

  const loadTokens = useCallback(async () => {
    setError("");
    try {
      const data = await listTokens();
      setTokens(data);
    } catch (err) {
      setError(
        err instanceof DeviceApiError
          ? err.message
          : t("devices.load_error"),
      );
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadTokens();
  }, [loadTokens]);

  function openCreateModal() {
    setLabel("");
    setCreatedToken(null);
    setCopyMessage("");
    setShowCreateModal(true);
  }

  function closeCreateModal() {
    const shouldRefresh = createdToken !== null;
    setShowCreateModal(false);
    setCreatedToken(null);
    setCopyMessage("");
    if (shouldRefresh) {
      void loadTokens();
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError("");

    try {
      const result = await createToken(label.trim() ? { label: label.trim() } : {});
      setCreatedToken(result);
    } catch (err) {
      setError(
        err instanceof DeviceApiError
          ? err.message
          : t("devices.create_error"),
      );
      setShowCreateModal(false);
    } finally {
      setCreating(false);
    }
  }

  async function handleCopy() {
    if (createdToken === null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(createdToken.token);
      setCopyMessage(t("devices.copy_success"));
    } catch {
      setCopyMessage(t("devices.copy_error"));
    }
  }

  async function handleRevoke(token: AccessToken) {
    const confirmed = window.confirm(
      t("devices.revoke_confirm", {
        name: token.label || token.token_prefix,
      }),
    );
    if (!confirmed) {
      return;
    }

    setRevokingId(token.id);
    setError("");

    try {
      await revokeToken(token.id);
      await loadTokens();
    } catch (err) {
      if (err instanceof DeviceApiError) {
        setError(err.message);
      } else {
        setError(t("devices.revoke_error"));
      }
      await loadTokens();
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <>
      <nav className="mb-6 flex items-center gap-1.5 text-sm">
        <Link
          to="/app"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home size={14} />
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-muted-foreground">{t("nav.producao")}</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="font-medium text-foreground">{t("devices.title")}</span>
      </nav>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Monitor size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {t("devices.title")}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("devices.subtitle")}
              </p>
            </div>
          </div>
          <Button onClick={openCreateModal}>{t("devices.create_token")}</Button>
        </div>

        {error && (
          <Alert color="destructive" tone="soft" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">
            {t("devices.loading")}
          </p>
        ) : tokens.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">{t("devices.empty")}</p>
            <Button className="mt-4" onClick={openCreateModal}>
              {t("devices.create_first")}
            </Button>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("devices.col.label")}</TableHead>
                  <TableHead>{t("devices.col.prefix")}</TableHead>
                  <TableHead>{t("devices.col.status")}</TableHead>
                  <TableHead>{t("devices.col.created_at")}</TableHead>
                  <TableHead>{t("devices.col.machine")}</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">
                      {token.label || "—"}
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">
                      {token.token_prefix}…
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          token.status === "active"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {statusLabel(token.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(token.created_at)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {token.machine ? (
                        <span title={token.machine.device_uuid}>
                          {token.machine.device_uuid.slice(0, 8)}… (
                          {statusLabel(token.machine.status)})
                        </span>
                      ) : (
                        t("devices.machine.unlinked")
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {token.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={revokingId === token.id}
                          className="border-destructive/40 text-destructive hover:bg-destructive/10"
                          onClick={() => void handleRevoke(token)}
                        >
                          {revokingId === token.id
                            ? t("devices.revoking")
                            : t("devices.revoke")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog
        open={showCreateModal}
        onOpenChange={(open) => !open && closeCreateModal()}
      >
        <DialogContent className="sm:max-w-md">
          {createdToken === null ? (
            <>
              <DialogHeader>
                <DialogTitle>{t("devices.dialog.new_title")}</DialogTitle>
                <DialogDescription>
                  {t("devices.dialog.new_description")}
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleCreate}>
                <div className="space-y-2">
                  <Label htmlFor="token-label">{t("devices.dialog.label")}</Label>
                  <Input
                    id="token-label"
                    maxLength={100}
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder={t("devices.dialog.label_placeholder")}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeCreateModal}
                  >
                    {t("module.cancel")}
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating
                      ? t("devices.dialog.creating")
                      : t("common.create")}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{t("devices.dialog.created_title")}</DialogTitle>
                <DialogDescription>
                  {t("devices.dialog.created_description")}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm break-all">
                {createdToken.token}
              </div>
              {copyMessage && (
                <p className="text-sm text-emerald-600">{copyMessage}</p>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void handleCopy()}
                >
                  {t("common.copy")}
                </Button>
                <Button type="button" onClick={closeCreateModal}>
                  {t("common.close")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
