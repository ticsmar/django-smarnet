import type { DisplayLine } from "./clienteDisplay";

export function ClienteDisplayLines({ lines }: { lines: DisplayLine[] }) {
  if (lines.length === 0) {
    return null;
  }
  return (
    <div className="space-y-0.5">
      {lines.map((line) =>
        line.href ? (
          <a
            key={line.key}
            href={line.href}
            className="block text-sm text-primary underline-offset-2 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            {line.text}
          </a>
        ) : (
          <p key={line.key} className="text-sm text-foreground">
            {line.text}
          </p>
        ),
      )}
    </div>
  );
}
