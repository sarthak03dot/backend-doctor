import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkEcosystem } from '../src/ecosystem-doctor';
import fs from 'fs';

describe('ecosystem-doctor', () => {
  let originalEnv: NodeJS.ProcessEnv;
  
  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv, TZ: 'UTC' };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should return true and detect docker if .dockerenv exists', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path) => path === '/.dockerenv');
    expect(checkEcosystem()).toBe(true);
  });

  it('should return true and detect PM2 if PM2_HOME is set', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    process.env.PM2_HOME = '/user/.pm2';
    expect(checkEcosystem()).toBe(true);
  });
});
