export type JsonType = { [k: string]: unknown };

export interface JsonDeserializer<T> {
  fromJSON(d: string | JsonType): T;
}

export function extractNumber(data: JsonType, k: string): number {
  return typeof data[k] === "number" ? (data[k] as number) : 0;
}

export function extractDate(data: JsonType, k: string): Date {
  return typeof data[k] === "string" ? new Date(data[k] as string) : new Date();
}

export function extractNullDate(data: JsonType, k: string): Date | null {
  return typeof data[k] === "string" ? new Date(data[k] as string) : null;
}

export function extractBool(data: JsonType, k: string): boolean {
  return !!data[k];
}

export function extractString(data: JsonType, k: string): string {
  return typeof data[k] === "string" ? (data[k] as string) : "";
}

export function extractEnum<T>(
  data: JsonType,
  k: string,
  enumType: Record<string, T>,
  defaultValue: T
): T {
  if (
    typeof data[k] === "string" &&
    Object.values(enumType).includes(data[k] as T)
  ) {
    return data[k] as T;
  }
  return defaultValue;
}

export function extractNestedModel<T>(
  data: JsonType,
  k: string,
  nestedModelType: JsonDeserializer<T>
): T | null {
  if (typeof data[k] === "object" && data[k] !== null) {
    return nestedModelType.fromJSON(data[k] as JsonType);
  }
  return null;
}
