import axios from 'axios';
import { setupAxiosInterceptors } from './AxiosConfig';

jest.mock('axios');

describe('AxiosConfig', () => {
  const mockStore = {
    getState: jest.fn(),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockStore.getState.mockReturnValue({
      auth: {
        token: 'test-token',
      },
    });
  });

  test('adds authorization header when token exists', () => {
    setupAxiosInterceptors(mockStore);

    // Get the request interceptor
    const requestInterceptor = axios.interceptors.request.use.mock.calls[0][0];

    // Create a mock config
    const config = {
      headers: {},
    };

    // Call the interceptor
    const result = requestInterceptor(config);

    expect(result.headers.Authorization).toBe('Bearer test-token');
  });

  test('does not add authorization header when token does not exist', () => {
    mockStore.getState.mockReturnValue({
      auth: {
        token: null,
      },
    });

    setupAxiosInterceptors(mockStore);

    const requestInterceptor = axios.interceptors.request.use.mock.calls[0][0];
    const config = {
      headers: {},
    };

    const result = requestInterceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  test('handles response errors correctly', async () => {
    setupAxiosInterceptors(mockStore);

    // Get the response error interceptor
    const responseErrorInterceptor = axios.interceptors.response.use.mock.calls[0][1];

    // Create a mock error
    const error = {
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    };

    // Call the interceptor and expect it to reject
    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);

    // Check if store.dispatch was called with logout action for 401 error
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  test('handles network errors correctly', async () => {
    setupAxiosInterceptors(mockStore);

    const responseErrorInterceptor = axios.interceptors.response.use.mock.calls[0][1];
    const error = new Error('Network Error');

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
  });

  test('handles response success correctly', () => {
    setupAxiosInterceptors(mockStore);

    // Get the response success interceptor
    const responseSuccessInterceptor = axios.interceptors.response.use.mock.calls[0][0];

    // Create a mock response
    const response = {
      data: {
        message: 'Success',
      },
    };

    // Call the interceptor
    const result = responseSuccessInterceptor(response);

    expect(result).toEqual(response);
  });

  test('preserves existing headers when adding authorization', () => {
    setupAxiosInterceptors(mockStore);

    const requestInterceptor = axios.interceptors.request.use.mock.calls[0][0];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Custom-Header': 'test',
      },
    };

    const result = requestInterceptor(config);

    expect(result.headers['Content-Type']).toBe('application/json');
    expect(result.headers['Custom-Header']).toBe('test');
    expect(result.headers.Authorization).toBe('Bearer test-token');
  });

  test('handles errors without response object', async () => {
    setupAxiosInterceptors(mockStore);

    const responseErrorInterceptor = axios.interceptors.response.use.mock.calls[0][1];
    const error = new Error('Generic Error');
    error.response = null;

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
}); 