function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === "") {
    return defaultValue;
  }
  return value === "true" || value === "1";
}

export function isMockDeviceManager(): boolean {
  return parseBoolean(import.meta.env.VITE_DEVICE_MOCK_IS_MANAGER, true);
}
