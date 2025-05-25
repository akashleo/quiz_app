import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTimer } from 'react-timer-hook';
import Timer from './Timer';

// Mock the react-timer-hook module
jest.mock('react-timer-hook', () => ({
  useTimer: jest.fn(),
}));

describe('Timer Component', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    useTimer.mockReset();
  });

  test('renders timer with correct time format', () => {
    // Mock the useTimer hook to return specific values
    useTimer.mockReturnValue({
      seconds: 30,
      minutes: 2,
      hours: 1,
      days: 0,
    });

    render(<Timer expiryTimestamp={new Date()} />);
    
    // Check if the timer displays the correct format
    expect(screen.getByText('01:02:30')).toBeInTheDocument();
  });

  test('renders timer with zero values', () => {
    useTimer.mockReturnValue({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });

    render(<Timer expiryTimestamp={new Date()} />);
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  test('handles single digit values correctly', () => {
    useTimer.mockReturnValue({
      seconds: 5,
      minutes: 7,
      hours: 3,
      days: 0,
    });

    render(<Timer expiryTimestamp={new Date()} />);
    
    expect(screen.getByText('03:07:05')).toBeInTheDocument();
  });
}); 