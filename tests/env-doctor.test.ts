import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkEnvVariables } from '../src/env-doctor';

describe('env-doctor', () => {
  let originalEnv: NodeJS.ProcessEnv;
  let consoleErrorMock: any;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    consoleErrorMock.mockRestore();
  });

  it('should return true if no required variables are specified', () => {
    expect(checkEnvVariables()).toBe(true);
    expect(checkEnvVariables([])).toBe(true);
  });

  it('should return true if all required variables are present', () => {
    process.env.TEST_VAR_1 = 'value1';
    process.env.TEST_VAR_2 = 'value2';
    expect(checkEnvVariables(['TEST_VAR_1', 'TEST_VAR_2'])).toBe(true);
  });

  it('should return false if required variables are missing', () => {
    process.env.TEST_VAR_1 = 'value1';
    delete process.env.TEST_VAR_2;
    expect(checkEnvVariables(['TEST_VAR_1', 'TEST_VAR_2'])).toBe(false);
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
