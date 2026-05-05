import { describe, it, expect } from 'vitest';
import {
  required,
  email,
  minLength,
  passwordMatch,
} from '../../userValidation';

describe('userValidation utilities', () => {
  describe('required', () => {
    it('should return true for a non-empty string', () => {
      expect(required('hello')).toBe(true);
    });

    it('should return error message for an empty string', () => {
      expect(required('')).toBe('Campo é obrigatório');
    });

    it('should return true for a string with only spaces', () => {
      // '  ' is truthy, so returns true (white-space only is still "truthy")
      expect(required('   ')).toBe(true);
    });

    it('should return error message for a string that is falsy', () => {
      expect(required(null as unknown as string)).toBe('Campo é obrigatório');
    });
  });

  describe('email', () => {
    it('should return true for a valid email', () => {
      expect(email('user@example.com')).toBe(true);
    });

    it('should return true for valid email with subdomains', () => {
      expect(email('user@mail.example.co.uk')).toBe(true);
    });

    it('should return error message for an invalid email (no @)', () => {
      expect(email('userexample.com')).toBe('Email inválido');
    });

    it('should return error message for an invalid email (no domain)', () => {
      expect(email('user@')).toBe('Email inválido');
    });

    it('should return error message for an empty string', () => {
      expect(email('')).toBe('Email inválido');
    });

    it('should return error message for email missing TLD', () => {
      expect(email('user@example')).toBe('Email inválido');
    });

    it('should return error message for email with spaces', () => {
      expect(email('user @example.com')).toBe('Email inválido');
    });
  });

  describe('minLength', () => {
    it('should return true when value meets the minimum length', () => {
      expect(minLength(6)('abcdef')).toBe(true);
    });

    it('should return true when value exceeds the minimum length', () => {
      expect(minLength(3)('hello world')).toBe(true);
    });

    it('should return error message when value is below the minimum length', () => {
      expect(minLength(8)('short')).toBe('Must be at least 8 characters');
    });

    it('should return error message for empty string', () => {
      expect(minLength(1)('')).toBe('Must be at least 1 characters');
    });

    it('should return true when value equals exactly the minimum length', () => {
      expect(minLength(5)('12345')).toBe(true);
    });

    it('should include the correct length in the error message', () => {
      const result = minLength(12)('tooshort');
      expect(result).toBe('Must be at least 12 characters');
    });
  });

  describe('passwordMatch', () => {
    it('should return true when passwords match', () => {
      expect(passwordMatch('myPassword123')('myPassword123')).toBe(true);
    });

    it('should return error message when passwords do not match', () => {
      expect(passwordMatch('myPassword123')('otherPassword')).toBe(
        'As senhas não são iguais',
      );
    });

    it('should return error message when confirmation is empty', () => {
      expect(passwordMatch('myPassword123')('')).toBe(
        'As senhas não são iguais',
      );
    });

    it('should return error message when original password is empty and confirmation is not', () => {
      expect(passwordMatch('')('something')).toBe('As senhas não são iguais');
    });

    it('should return true when both passwords are empty strings', () => {
      expect(passwordMatch('')('')).toBe(true);
    });

    it('should be case-sensitive', () => {
      expect(passwordMatch('Password')('password')).toBe(
        'As senhas não são iguais',
      );
    });
  });
});