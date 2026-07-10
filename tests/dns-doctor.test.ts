import { describe, it, expect, vi } from 'vitest';
import { checkDNS } from '../src/dns-doctor';
import dns from 'dns';



describe('dns-doctor', () => {
  it('should return true if dns resolves', async () => {
    vi.spyOn(dns, 'resolve').mockImplementation((domain: string, cb: any) => cb(null, ['1.2.3.4']));
    const result = await checkDNS();
    expect(result).toBe(true);
  });

  it('should return false if dns fails', async () => {
    vi.spyOn(dns, 'resolve').mockImplementation((domain: string, cb: any) => cb(new Error('Network error')));
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await checkDNS();
    expect(result).toBe(false);
    consoleWarnMock.mockRestore();
  });
});
