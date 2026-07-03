export interface AccessTokenMachine {
  device_uuid: string;
  status: string;
  registered_at: string;
  last_access_at: string | null;
}

export interface AccessToken {
  id: number;
  label: string;
  status: "active" | "revoked";
  token_prefix: string;
  created_at: string;
  revoked_at: string | null;
  machine: AccessTokenMachine | null;
}

export interface CreateAccessTokenInput {
  label?: string;
}

export interface CreatedAccessToken extends AccessToken {
  token: string;
}
