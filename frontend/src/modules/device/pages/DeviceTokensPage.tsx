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
import { DeviceApiError, createToken, listTokens, revokeToken } from "../api/deviceApi";
import type { AccessToken, CreatedAccessToken } from "../types/accessToken";

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }
  return new Date(value).toLocaleString("pt-BR");
}

function statusLabel(status: AccessToken["status"]): string {
  return status === "active" ? "Ativo" : "Revogado";
}

export function DeviceTokensPage() {
  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdToken, setCreatedToken] = useState<CreatedAccessToken | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [revokingId, setRevokingId] = useState<number | null>(null);

  const loadTokens = useCallback(async () => {
    setError("");
    try {
      const data = await listTokens();
      setTokens(data);
    } catch (err) {
      setError(err instanceof DeviceApiError ? err.message : "Falha ao carregar tokens.");
    } finally {
      setLoading(false);
    }
  }, []);

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
      setError(err instanceof DeviceApiError ? err.message : "Falha ao criar token.");
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
      setCopyMessage("Token copiado!");
    } catch {
      setCopyMessage("Não foi possível copiar. Selecione e copie manualmente.");
    }
  }

  async function handleRevoke(token: AccessToken) {
    const confirmed = window.confirm(
      `Revogar o token "${token.label || token.token_prefix}"? O cliente desktop vinculado deixará de funcionar.`,
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
        setError("Falha ao revogar token.");
      }
      await loadTokens();
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <>
      <nav className="mb-6 flex items-center gap-1.5 text-sm">
        <Link to="/app" className="text-muted-foreground transition-colors hover:text-foreground">
          <Home size={14} />
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-muted-foreground">Produção</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="font-medium text-foreground">Devices</span>
      </nav>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Monitor size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Devices</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Gerencie tokens de acesso para clientes desktop das filiais.
              </p>
            </div>
          </div>
          <Button onClick={openCreateModal}>Criar token</Button>
        </div>

        {error && (
          <Alert color="destructive" tone="soft" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">Carregando tokens...</p>
        ) : tokens.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">Nenhum token criado ainda.</p>
            <Button className="mt-4" onClick={openCreateModal}>
              Criar primeiro token
            </Button>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Prefixo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Máquina</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">{token.label || "—"}</TableCell>
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
                          {token.machine.device_uuid.slice(0, 8)}… ({token.machine.status})
                        </span>
                      ) : (
                        "Não vinculada"
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
                          {revokingId === token.id ? "Revogando..." : "Revogar"}
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

      <Dialog open={showCreateModal} onOpenChange={(open) => !open && closeCreateModal()}>
        <DialogContent className="sm:max-w-md">
          {createdToken === null ? (
            <>
              <DialogHeader>
                <DialogTitle>Novo token</DialogTitle>
                <DialogDescription>
                  O token completo só será exibido uma vez após a criação.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleCreate}>
                <div className="space-y-2">
                  <Label htmlFor="token-label">Label (opcional)</Label>
                  <Input
                    id="token-label"
                    maxLength={100}
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder="Ex: Caixa 01"
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeCreateModal}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? "Criando..." : "Criar"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Token criado</DialogTitle>
                <DialogDescription>
                  Copie agora — este token não será exibido novamente.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm break-all">
                {createdToken.token}
              </div>
              {copyMessage && (
                <p className="text-sm text-emerald-600">{copyMessage}</p>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => void handleCopy()}>
                  Copiar
                </Button>
                <Button type="button" onClick={closeCreateModal}>
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
