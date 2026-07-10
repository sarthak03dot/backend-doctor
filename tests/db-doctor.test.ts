import { describe, it, expect, vi } from 'vitest';
import { checkDatabase } from '../src/db-doctor';

describe('db-doctor', () => {
  it('should return false if URI is invalid', async () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await checkDatabase('invalid-uri');
    expect(result).toBe(false);
    consoleWarnMock.mockRestore();
  });
});
