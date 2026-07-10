import { describe, it, expect, vi } from 'vitest';
import { checkSystem } from '../src/system-doctor';

describe('system-doctor', () => {
  it('should return a boolean indicating system status', () => {
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const isOk = checkSystem();
    expect(typeof isOk).toBe('boolean');

    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
  });
});
