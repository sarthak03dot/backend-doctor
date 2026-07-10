import { describe, it, expect, vi } from 'vitest';
import { checkRedis } from '../src/redis-doctor';

describe('redis-doctor', () => {
  it('should return false if connection fails', async () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // We expect it to fail gracefully if redis is not running locally.
    const result = await checkRedis('redis://localhost:9999');
    
    expect(result).toBe(false);
    consoleWarnMock.mockRestore();
    consoleErrorMock.mockRestore();
  });
});
