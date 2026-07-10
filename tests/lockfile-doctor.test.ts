import { describe, it, expect, vi, afterEach } from 'vitest';
import { checkLockfiles } from '../src/lockfile-doctor';
import fs from 'fs';

describe('lockfile-doctor', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true if only one lockfile exists', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path) => path.toString().includes('package-lock.json'));
    expect(checkLockfiles()).toBe(true);
  });

  it('should return false if multiple lockfiles exist', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path) => {
      const p = path.toString();
      return p.includes('package-lock.json') || p.includes('yarn.lock');
    });
    
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(checkLockfiles()).toBe(false);
    consoleWarnMock.mockRestore();
  });
});

