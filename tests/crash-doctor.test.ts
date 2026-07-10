import { describe, it, expect, vi } from 'vitest';
import { setupCrashDoctor } from '../src/crash-doctor';

describe('crash-doctor', () => {
  it('should attach listeners to process', () => {
    const onSpy = vi.spyOn(process, 'on').mockImplementation((event, listener) => process);
    
    setupCrashDoctor();
    
    expect(onSpy).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
    expect(onSpy).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));
    
    onSpy.mockRestore();
  });
});
