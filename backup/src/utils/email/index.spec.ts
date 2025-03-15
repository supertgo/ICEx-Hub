import { INVALID_EMAIL } from "utils/errors";
import { validateInputUserEmail } from ".";

describe("validateInputUserEmail()", () => {
  it("should return true to valid email", () => {
    expect(validateInputUserEmail("aninha@gmail.com")).toBe(true);
  });
  it("should return a string to invalid email", () => {
    expect(validateInputUserEmail("aninhagmail.com")).toBe(INVALID_EMAIL);
  });
});
