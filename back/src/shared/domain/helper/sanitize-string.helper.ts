export function sanitizeString(input: string): string {
  return input
    .normalize('NFD') // Breaks down accented characters into their base character + separate diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics(accent)
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars (keep alphanumeric + spaces)
    .trim()
    .replace(/\s+/g, ' '); // Collapse multiple spaces
}
