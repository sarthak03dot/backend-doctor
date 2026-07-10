import { describe, it, expect, vi, afterEach } from 'vitest';
import { checkFilePermissions } from '../src/fs-doctor';
import fs from 'fs';

describe('fs-doctor', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true if all directories are accessible', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'accessSync').mockImplementation(() => {});
    expect(checkFilePermissions(['/uploads', '/tmp'])).toBe(true);
  });

  it('should return false if a directory is not accessible', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'accessSync').mockImplementation(() => {
      throw new Error('Permission denied');
    });
    
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(checkFilePermissions(['/protected'])).toBe(false);
    consoleErrorMock.mockRestore();
  });
});

