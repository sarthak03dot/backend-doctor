import { describe, it, expect, vi } from 'vitest';
import { setupGracefulShutdown } from '../src/shutdown-doctor';

describe('shutdown-doctor', () => {
  it('should attach listeners to process for shutdown signals', () => {
    const onSpy = vi.spyOn(process, 'on').mockImplementation((event, listener) => process);
    
    setupGracefulShutdown(async () => {});
    
    expect(onSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    expect(onSpy).toHaveBeenCalledWith('SIGTERM', expect.any(Function));
    
    onSpy.mockRestore();
  });
});
