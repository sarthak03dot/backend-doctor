import pc from 'picocolors';

/**
 * Standardized API Response formatter.
 * Solves the problem of every company inventing its own format.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export const api = {
  success<T>(data: T, message: string = 'Success'): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  error(message: string, errorDetails?: any): ApiResponse<null> {
    return {
      success: false,
      message,
      error: errorDetails || null,
    };
  }
};
