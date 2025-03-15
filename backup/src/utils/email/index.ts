import { INVALID_EMAIL } from "utils/errors";

export const userEmailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/;

export function validateInputUserEmail(value: string): string | boolean {
  if (userEmailRegex.test(value)) return true;

  return INVALID_EMAIL;
}
