import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

describe('sanitizeString helper unit tests', () => {
  it('should return the same string when already clean', () => {
    expect(sanitizeString('Hello World')).toBe('Hello World');
  });

  it('should remove accent/diacritic characters', () => {
    expect(sanitizeString('Ciência da Computação')).toBe(
      'Ciencia da Computacao',
    );
    expect(sanitizeString('Álgebra')).toBe('Algebra');
    expect(sanitizeString('Ênfase')).toBe('Enfase');
    expect(sanitizeString('Óptica')).toBe('Optica');
  });

  it('should remove special characters but keep alphanumeric and spaces', () => {
    expect(sanitizeString('Hello, World!')).toBe('Hello World');
    expect(sanitizeString('C++ Programming')).toBe('C Programming');
    expect(sanitizeString('Node.js & React')).toBe('Nodejs  React');
  });

  it('should trim leading and trailing spaces', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
    expect(sanitizeString('   spaces   ')).toBe('spaces');
  });

  it('should collapse multiple internal spaces into one', () => {
    expect(sanitizeString('Hello   World')).toBe('Hello World');
    expect(sanitizeString('A  B   C')).toBe('A B C');
  });

  it('should handle strings with only special characters', () => {
    expect(sanitizeString('!!!@@@###')).toBe('');
    expect(sanitizeString('...')).toBe('');
  });

  it('should preserve numbers', () => {
    expect(sanitizeString('Curso 101')).toBe('Curso 101');
    expect(sanitizeString('DCC001')).toBe('DCC001');
  });

  it('should handle empty string', () => {
    expect(sanitizeString('')).toBe('');
  });

  it('should handle string with only spaces', () => {
    expect(sanitizeString('   ')).toBe('');
  });

  it('should handle mixed accents and special chars', () => {
    expect(sanitizeString('Engenharia de Produção & Gestão')).toBe(
      'Engenharia de Producao  Gestao',
    );
  });

  it('should keep uppercase and lowercase letters', () => {
    const result = sanitizeString('AbCdEf');
    expect(result).toBe('AbCdEf');
  });
});