import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import { act } from '@testing-library/react';
import Login from './Login';
import * as authActions from '../../store/slices/auth/AuthActions';

// Mock the auth actions
jest.mock('../../store/slices/auth/AuthActions');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Page', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form with all fields', () => {
    render(<Login />);
    
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<Login />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    await act(async () => {
      fireEvent.click(loginButton);
    });
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(loginButton);
    });
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('calls login action with correct credentials', async () => {
    const mockLoginAction = jest.fn().mockResolvedValue({ success: true });
    authActions.login.mockImplementation(mockLoginAction);
    
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);
    });
    
    expect(mockLoginAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  test('shows error message on login failure', async () => {
    const mockError = 'Invalid credentials';
    authActions.login.mockRejectedValue(new Error(mockError));
    
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });
  });

  test('toggles password visibility', () => {
    render(<Login />);
    
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
}); 