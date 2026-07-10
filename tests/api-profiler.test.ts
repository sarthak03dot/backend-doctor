import { describe, it, expect } from 'vitest';
import { slowQueryProfiler } from '../src/api-profiler';

describe('api-profiler', () => {
  it('should create an api profiler middleware', () => {
    const profiler = slowQueryProfiler();
    expect(typeof profiler).toBe('function');
  });
});
