import { describe, it, expect } from 'vitest';
import { rateLimiter } from '../src/rate-limiter';
import express from 'express';

describe('rate-limiter', () => {
  it('should create a rate limiter middleware', () => {
    const limiter = rateLimiter({ max: 100, windowMs: 15 * 60 * 1000 });
    expect(typeof limiter).toBe('function');
  });
});
