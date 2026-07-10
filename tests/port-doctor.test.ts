import { describe, it, expect } from 'vitest';
import { checkPort } from '../src/port-doctor';
import net from 'net';

describe('port-doctor', () => {
  it('should return true if port is available', async () => {
    const isAvailable = await checkPort(35874); // A random port likely to be available
    expect(isAvailable).toBe(true);
  });

  it('should return false if port is in use', async () => {
    const server = net.createServer();
    await new Promise<void>((resolve) => {
      server.listen(35875, () => resolve());
    });

    const isAvailable = await checkPort(35875);
    expect(isAvailable).toBe(false);

    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });
});
