import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import QuestionBank from './QuestionBank';
import * as questionActions from '../../store/slices/question/QuestionAction';
import * as topicActions from '../../store/slices/topic/TopicAction';
import { mockQuestion, mockTopic } from '../../utils/test-utils';

// Mock the actions
jest.mock('../../store/slices/question/QuestionAction');
jest.mock('../../store/slices/topic/TopicAction');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('QuestionBank Component', () => {
  const mockQuestions = [
    mockQuestion,
    { ...mockQuestion, id: '2', text: 'Test Question 2' },
    { ...mockQuestion, id: '3', text: 'Test Question 3' },
  ];

  const mockTopics = [
    mockTopic,
    { ...mockTopic, id: '2', title: 'Test Topic 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    questionActions.fetchQuestions.mockResolvedValue({ questions: mockQuestions });
    topicActions.fetchTopics.mockResolvedValue({ topics: mockTopics });
  });

  test('renders loading state initially', () => {
    render(<QuestionBank />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders questions and topics after loading', async () => {
    render(<QuestionBank />);

    await waitFor(() => {
      mockQuestions.forEach(question => {
        expect(screen.getByText(question.text)).toBeInTheDocument();
      });
      mockTopics.forEach(topic => {
        expect(screen.getByText(topic.title)).toBeInTheDocument();
      });
    });
  });

  test('filters questions by topic', async () => {
    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getAllByTestId('question-card')).toHaveLength(mockQuestions.length);
    });

    const topicFilter = screen.getByTestId('topic-filter');
    fireEvent.click(topicFilter);
    
    const topicOption = screen.getByText(mockTopics[0].title);
    fireEvent.click(topicOption);

    const filteredQuestions = mockQuestions.filter(q => q.topicId === mockTopics[0].id);
    expect(screen.getAllByTestId('question-card')).toHaveLength(filteredQuestions.length);
  });

  test('opens add question modal', async () => {
    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getByText(/add question/i)).toBeInTheDocument();
    });

    const addButton = screen.getByText(/add question/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/create new question/i)).toBeInTheDocument();
  });

  test('opens edit question modal', async () => {
    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].text)).toBeInTheDocument();
    });

    const editButton = screen.getByTestId(`edit-question-${mockQuestions[0].id}`);
    fireEvent.click(editButton);

    expect(screen.getByText(/edit question/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockQuestions[0].text)).toBeInTheDocument();
  });

  test('deletes question after confirmation', async () => {
    questionActions.deleteQuestionAction.mockResolvedValue({});
    
    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].text)).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId(`delete-question-${mockQuestions[0].id}`);
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByText(/confirm/i);
    fireEvent.click(confirmButton);

    expect(questionActions.deleteQuestionAction).toHaveBeenCalledWith(mockQuestions[0].id);
  });

  test('searches questions by text', async () => {
    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getAllByTestId('question-card')).toHaveLength(mockQuestions.length);
    });

    const searchInput = screen.getByPlaceholderText(/search questions/i);
    fireEvent.change(searchInput, { target: { value: 'Test Question 2' } });

    expect(screen.getByText('Test Question 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Question 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Question 3')).not.toBeInTheDocument();
  });

  test('shows error message when loading fails', async () => {
    const error = new Error('Failed to load questions');
    questionActions.fetchQuestions.mockRejectedValue(error);

    render(<QuestionBank />);

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  test('loads archived questions', async () => {
    const archivedQuestions = [
      { ...mockQuestion, id: '4', text: 'Archived Question 1', isArchived: true },
    ];
    questionActions.fetchArchivedQuestions.mockResolvedValue({ questions: archivedQuestions });

    render(<QuestionBank />);

    const archiveTab = screen.getByText(/archived/i);
    fireEvent.click(archiveTab);

    await waitFor(() => {
      expect(screen.getByText('Archived Question 1')).toBeInTheDocument();
    });
  });

  test('restores archived question', async () => {
    const archivedQuestion = { ...mockQuestion, id: '4', text: 'Archived Question 1', isArchived: true };
    questionActions.fetchArchivedQuestions.mockResolvedValue({ questions: [archivedQuestion] });
    questionActions.restoreQuestionAction.mockResolvedValue({});

    render(<QuestionBank />);

    const archiveTab = screen.getByText(/archived/i);
    fireEvent.click(archiveTab);

    await waitFor(() => {
      expect(screen.getByText('Archived Question 1')).toBeInTheDocument();
    });

    const restoreButton = screen.getByTestId(`restore-question-${archivedQuestion.id}`);
    fireEvent.click(restoreButton);

    expect(questionActions.restoreQuestionAction).toHaveBeenCalledWith(archivedQuestion.id);
  });
}); 