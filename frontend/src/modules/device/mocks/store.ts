import { DeviceApiError } from "../api/errors";
import type {
  AccessToken,
  CreateAccessTokenInput,
  CreatedAccessToken,
} from "../types/accessToken";

const MOCK_DELAY_MS = 150;

let nextId = 3;

const tokens: AccessToken[] = [
  {
    id: "1",
    label: "Caixa 01",
    status: "active",
    token_prefix: "a1b2c3d4",
    created_at: "2026-06-28T10:00:00.000Z",
    revoked_at: null,
    machine: {
      device_uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      status: "active",
      registered_at: "2026-06-28T11:30:00.000Z",
      last_access_at: "2026-06-30T08:15:00.000Z",
    },
  },
  {
    id: "2",
    label: "",
    status: "active",
    token_prefix: "e5f6g7h8",
    created_at: "2026-06-29T14:20:00.000Z",
    revoked_at: null,
    machine: null,
  },
];

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS);
  });
}

function generateTokenValue(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sortNewestFirst(items: AccessToken[]): AccessToken[] {
  return [...items].sort(
    (left, right) =>
      new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );
}

export async function listTokens(): Promise<AccessToken[]> {
  return delay(sortNewestFirst(tokens));
}

export async function createToken(
  input: CreateAccessTokenInput = {},
): Promise<CreatedAccessToken> {
  const rawToken = generateTokenValue();
  const now = new Date().toISOString();
  const created: CreatedAccessToken = {
    id: String(nextId++),
    label: input.label?.trim() ?? "",
    status: "active",
    token_prefix: rawToken.slice(0, 8),
    created_at: now,
    revoked_at: null,
    machine: null,
    token: rawToken,
  };

  tokens.push(created);
  return delay(created);
}

export async function revokeToken(id: string): Promise<AccessToken> {
  const token = tokens.find((item) => item.id === id);
  if (token === undefined) {
    throw new DeviceApiError("Token não encontrado.", 404);
  }

  if (token.status === "revoked") {
    throw new DeviceApiError("Token já está revogado.", 400);
  }

  token.status = "revoked";
  token.revoked_at = new Date().toISOString();
  if (token.machine !== null) {
    token.machine = { ...token.machine, status: "revoked" };
  }

  return delay({ ...token });
}
