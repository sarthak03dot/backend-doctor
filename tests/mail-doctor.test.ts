import { describe, it, expect, vi } from 'vitest';
import net from 'net';

vi.mock('net', () => {
  return {
    default: {
      Socket: class {
        setTimeout() {}
        on(event: string, cb: any) {
          if (event === 'error') {
            cb(new Error('connection failed'));
          }
        }
        destroy() {}
        connect() {}
      }
    }
  };
});
import { checkMailServer } from '../src/mail-doctor';

describe('mail-doctor', () => {
  it('should return false if mail connection fails', async () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const result = await checkMailServer({
      host: 'smtp.invalid.local',
      port: 587,
      auth: { user: 'u', pass: 'p' }
    });
    
    expect(result).toBe(false);
    consoleWarnMock.mockRestore();
  });
});
