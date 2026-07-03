import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";

// Self-hosted TinyMCE (no API key needed)
import "tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin";

// Core plugins used in the default toolbar
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

import { cn } from "@/lib/utils";
import { FormFieldShell, FormFieldStatus } from "./FormField";

export interface FormRichTextTinyMCEProps {
    id?: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    success?: React.ReactNode;
    required?: boolean;
    status?: FormFieldStatus;
    /** Conteúdo HTML inicial */
    content?: string;
    onChange?: (html: string) => void;
    minHeight?: number;
    className?: string;
    /** Toolbar customizada do TinyMCE */
    toolbar?: string;
    /** Lista de plugins (default cobre o uso comum) */
    plugins?: string[];
}

const DEFAULT_PLUGINS = [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
];

const DEFAULT_TOOLBAR =
    "undo redo | blocks | bold italic underline strikethrough | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | link image table | removeformat | code";

/**
 * Editor de texto rico usando TinyMCE (self-hosted, sem API key).
 * Alternativa ao FormRichText (TipTap) — útil para usuários que já conhecem TinyMCE.
 */
export function FormRichTextTinyMCE({
    id: idProp,
    label,
    description,
    hint,
    error,
    success,
    required,
    status,
    content = "",
    onChange,
    minHeight = 240,
    className,
    toolbar = DEFAULT_TOOLBAR,
    plugins = DEFAULT_PLUGINS,
}: FormRichTextTinyMCEProps) {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const computedStatus: FormFieldStatus =
        status ?? (error ? "error" : success ? "success" : "default");

    return (
        <FormFieldShell
            id={id}
            label={label}
            required={required}
            description={description}
            hint={hint}
            error={error}
            success={success}
            status={computedStatus}
            className={className}
        >
            <div
                className={cn(
                    "rounded-xl border border-border bg-background overflow-hidden",
                    computedStatus === "error" && "border-destructive",
                )}
            >
                <Editor
                    id={id}
                    licenseKey="gpl"
                    initialValue={content}
                    onEditorChange={(html) => onChange?.(html)}
                    init={{
                        height: minHeight,
                        menubar: false,
                        branding: false,
                        promotion: false,
                        plugins,
                        toolbar,
                        skin: false,
                        content_css: false,
                        content_style:
                            "body { font-family: Inter, system-ui, sans-serif; font-size: 14px; color: hsl(var(--foreground)); background: transparent; }",
                    }}
                />
            </div>
        </FormFieldShell>
    );
}
