import { apiRequest, ApiError } from "@/api/client";
import type {
  AccessToken,
  CreateAccessTokenInput,
  CreatedAccessToken,
} from "../types/accessToken";
import { DeviceApiError } from "./errors";

export { DeviceApiError } from "./errors";

function toDeviceApiError(err: unknown): never {
  if (err instanceof DeviceApiError) {
    throw err;
  }
  if (err instanceof ApiError) {
    throw new DeviceApiError(err.message, err.status);
  }
  throw new DeviceApiError("Falha na requisição.", 0);
}

export async function listTokens(): Promise<AccessToken[]> {
  try {
    return await apiRequest<AccessToken[]>("/branch-auth/tokens/");
  } catch (err) {
    toDeviceApiError(err);
  }
}

export async function createToken(
  input: CreateAccessTokenInput = {},
): Promise<CreatedAccessToken> {
  try {
    return await apiRequest<CreatedAccessToken>("/branch-auth/tokens/", {
      method: "POST",
      body: JSON.stringify(input),
    });
  } catch (err) {
    toDeviceApiError(err);
  }
}

export async function revokeToken(id: number): Promise<AccessToken> {
  try {
    return await apiRequest<AccessToken>(`/branch-auth/tokens/${id}/revoke/`, {
      method: "POST",
    });
  } catch (err) {
    toDeviceApiError(err);
  }
}
