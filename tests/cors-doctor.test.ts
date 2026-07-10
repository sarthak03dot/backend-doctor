import { describe, it, expect, vi } from 'vitest';
import { checkCORS } from '../src/cors-doctor';

describe('cors-doctor', () => {
  it('should return false if origin is "*"', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(checkCORS({ origin: '*', credentials: true })).toBe(false);
    consoleWarnMock.mockRestore();
  });

  it('should return true if origin is an array or specific domain', () => {
    expect(checkCORS({ origin: ['https://example.com'] })).toBe(true);
    expect(checkCORS({ origin: 'https://example.com' })).toBe(true);
  });
});
