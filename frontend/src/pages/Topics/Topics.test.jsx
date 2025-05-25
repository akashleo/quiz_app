import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import Topics from './Topics';
import * as topicActions from '../../store/slices/topic/TopicAction';
import { mockTopic } from '../../utils/test-utils';

// Mock the topic actions
jest.mock('../../store/slices/topic/TopicAction');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Topics Page', () => {
  const mockTopics = [
    mockTopic,
    { ...mockTopic, id: '2', title: 'Test Topic 2' },
    { ...mockTopic, id: '3', title: 'Test Topic 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the fetchTopics action to return test data
    topicActions.fetchTopics.mockResolvedValue({ topics: mockTopics });
  });

  test('renders topics page with loading state', () => {
    render(<Topics />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders topics after loading', async () => {
    render(<Topics />);
    
    await waitFor(() => {
      mockTopics.forEach(topic => {
        expect(screen.getByText(topic.title)).toBeInTheDocument();
      });
    });
  });

  test('displays error message when topics fetch fails', async () => {
    const errorMessage = 'Failed to fetch topics';
    topicActions.fetchTopics.mockRejectedValue(new Error(errorMessage));
    
    render(<Topics />);
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('filters topics based on search input', async () => {
    render(<Topics />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Topic 2')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/search topics/i);
    fireEvent.change(searchInput, { target: { value: 'Topic 2' } });
    
    expect(screen.getByText('Test Topic 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Topic 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Topic 3')).not.toBeInTheDocument();
  });

  test('sorts topics alphabetically', async () => {
    render(<Topics />);
    
    await waitFor(() => {
      expect(screen.getAllByTestId('topic-card')).toHaveLength(mockTopics.length);
    });
    
    const sortButton = screen.getByRole('button', { name: /sort/i });
    fireEvent.click(sortButton);
    
    const topicCards = screen.getAllByTestId('topic-card');
    const topicTitles = topicCards.map(card => card.textContent);
    const sortedTitles = [...topicTitles].sort();
    
    expect(topicTitles).toEqual(sortedTitles);
  });

  test('navigates to topic details when topic card is clicked', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    render(<Topics />);
    
    await waitFor(() => {
      expect(screen.getByText(mockTopics[0].title)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText(mockTopics[0].title));
    
    expect(mockNavigate).toHaveBeenCalledWith(`/topics/${mockTopics[0].id}`);
  });

  test('shows no topics found message when search yields no results', async () => {
    render(<Topics />);
    
    await waitFor(() => {
      expect(screen.getAllByTestId('topic-card')).toHaveLength(mockTopics.length);
    });
    
    const searchInput = screen.getByPlaceholderText(/search topics/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent topic' } });
    
    expect(screen.getByText(/no topics found/i)).toBeInTheDocument();
  });
}); 