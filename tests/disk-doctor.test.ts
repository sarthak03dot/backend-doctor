import { describe, it, expect, vi } from 'vitest';
import { checkDiskSpace } from '../src/disk-doctor';
import fs from 'fs';

describe('disk-doctor', () => {
  it('should return true if disk space is sufficient', () => {
    vi.spyOn(fs, 'statfsSync').mockReturnValue({
      bfree: 1000000,
      bsize: 1024,
      bavail: 1000000,
      blocks: 2000000,
    } as any);

    expect(checkDiskSpace('/')).toBe(true);
  });

  it('should return false if disk space is critically low', () => {
    vi.spyOn(fs, 'statfsSync').mockReturnValue({
      bfree: 100, // Very low free space
      bsize: 1024,
      bavail: 100,
      blocks: 2000000,
    } as any);

    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(checkDiskSpace('/')).toBe(false);
    consoleWarnMock.mockRestore();
  });
});
