import { describe, it, expect } from 'vitest';
import { api } from '../src/api-response';

describe('api-response', () => {
  it('should structure success responses correctly', () => {
    const res = api.success({ id: 1 }, 'Data retrieved');
    expect(res).toEqual({
      success: true,
      message: 'Data retrieved',
      data: { id: 1 }
    });
  });

  it('should structure error responses correctly', () => {
    const res = api.error('Not found', { code: 404 });
    expect(res).toEqual({
      success: false,
      message: 'Not found',
      error: { code: 404 }
    });
  });
});
