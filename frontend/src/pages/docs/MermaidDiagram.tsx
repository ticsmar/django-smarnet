import {
  useEffect,
  useId,
  useState,
} from "react";
import mermaid from "mermaid";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

function resolvedColorScheme(
  theme: "light" | "dark" | "system" | "admin",
): "light" | "dark" {
  if (theme === "admin") {
    return "dark";
  }
  if (theme !== "system") {
    return theme;
  }
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const { theme } = useApp();
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = chart.trim();
    if (!source) {
      setSvg("");
      setError(null);
      return;
    }

    let cancelled = false;
    const scheme = resolvedColorScheme(theme);
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: scheme === "dark" ? "dark" : "neutral",
      fontFamily: "inherit",
    });

    const id = `mmd-${reactId}-${Math.random().toString(36).slice(2, 8)}`;
    void mermaid
      .render(id, source)
      .then((result) => {
        if (cancelled) {
          return;
        }
        setSvg(result.svg);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) {
          return;
        }
        setSvg("");
        setError(
          err instanceof Error ? err.message : "Falha ao renderizar diagrama",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [chart, theme, reactId]);

  if (error) {
    return (
      <div className="mb-6 rounded-xl border border-destructive/40 bg-surface-container-low p-4">
        <p className="mb-2 text-xs font-medium text-destructive">{error}</p>
        <pre className="overflow-x-auto font-mono text-[12px]">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className="mb-6 h-24 animate-pulse rounded-xl bg-surface-container-low"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "mb-6 overflow-x-auto rounded-xl border border-border/50 bg-surface-container-low p-4",
        "[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full",
      )}
      role="img"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
