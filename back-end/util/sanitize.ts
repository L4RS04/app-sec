export const sanitizeString = (input: string): string =>
    input.replace(/[<>$]/g, '').trim();
  