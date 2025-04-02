export type PropOrFactory<T> = T | ((index: number) => T);

export function isEnumValue<T extends Record<string, unknown>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return Object.values(enumObj).includes(value);
}
