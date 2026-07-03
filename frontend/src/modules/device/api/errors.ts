export class DeviceApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DeviceApiError";
    this.status = status;
  }
}
