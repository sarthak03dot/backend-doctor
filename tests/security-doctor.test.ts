import { describe, it, expect, vi } from 'vitest';
import { checkSecurity } from '../src/security-doctor';

describe('security-doctor', () => {
  it('should return true if helmet is enabled', () => {
    expect(checkSecurity({ helmet: true })).toBe(true);
  });

  it('should return false if helmet is disabled', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(checkSecurity({ helmet: false })).toBe(false);
    consoleWarnMock.mockRestore();
  });
});
