import {
  File,
  FileSpreadsheet,
  FileText,
  Folder,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import type { FileManagerNode } from "./types";

export function FileTypeIcon({ node }: { node: FileManagerNode }) {
  if (node.in_lixeira && node.tipo === 0) {
    return <Trash2 className="size-4 shrink-0 text-muted-foreground" />;
  }
  if (node.tipo === 0) {
    return <Folder className="size-4 shrink-0 text-accent" />;
  }
  const name = node.nome.toLowerCase();
  if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(name)) {
    return <ImageIcon className="size-4 shrink-0 text-status-info" />;
  }
  if (/\.(xls|xlsx|csv)$/.test(name)) {
    return <FileSpreadsheet className="size-4 shrink-0 text-status-success" />;
  }
  if (/\.(pdf|txt|doc|docx)$/.test(name)) {
    return <FileText className="size-4 shrink-0 text-destructive" />;
  }
  return <File className="size-4 shrink-0 text-muted-foreground" />;
}
