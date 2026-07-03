import type { ApiErrorBody } from "@/types/auth";

const API_BASE_URL =
  import.meta.env.VITE_DJANGO_API_URL ?? "http://localhost:8000/api";

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(status: number, message: string, body: ApiErrorBody | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function formatErrorBody(body: ApiErrorBody): string {
  if ("detail" in body && typeof body.detail === "string") {
    return body.detail;
  }

  return Object.entries(body)
    .flatMap(([field, messages]) =>
      (messages as string[]).map((message: string) => `${field}: ${message}`),
    )
    .join(" ");
}

async function parseError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | null = null;

  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = null;
  }

  const message =
    body !== null ? formatErrorBody(body) : response.statusText || "Request failed";

  return new ApiError(response.status, message, body);
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
