import topicReducer, {
  setTopics,
  setLoading,
  setError,
  addTopic,
  updateTopic,
  deleteTopic,
} from './TopicSlice';
import { mockTopic } from '../../../utils/test-utils';

describe('Topic Slice', () => {
  const initialState = {
    topics: [],
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(topicReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle setTopics', () => {
    const topics = [mockTopic];
    const actualState = topicReducer(initialState, setTopics(topics));
    
    expect(actualState.topics).toEqual(topics);
    expect(actualState.loading).toBeFalsy();
    expect(actualState.error).toBeNull();
  });

  test('should handle setLoading', () => {
    const actualState = topicReducer(initialState, setLoading(true));
    
    expect(actualState.loading).toBeTruthy();
  });

  test('should handle setError', () => {
    const error = 'Test error message';
    const actualState = topicReducer(initialState, setError(error));
    
    expect(actualState.error).toBe(error);
    expect(actualState.loading).toBeFalsy();
  });

  test('should handle addTopic', () => {
    const newTopic = { ...mockTopic, id: '2' };
    const state = {
      ...initialState,
      topics: [mockTopic],
    };
    
    const actualState = topicReducer(state, addTopic(newTopic));
    
    expect(actualState.topics).toHaveLength(2);
    expect(actualState.topics).toContainEqual(newTopic);
  });

  test('should handle updateTopic', () => {
    const updatedTopic = { ...mockTopic, title: 'Updated Title' };
    const state = {
      ...initialState,
      topics: [mockTopic],
    };
    
    const actualState = topicReducer(state, updateTopic(updatedTopic));
    
    expect(actualState.topics[0]).toEqual(updatedTopic);
  });

  test('should handle deleteTopic', () => {
    const state = {
      ...initialState,
      topics: [mockTopic],
    };
    
    const actualState = topicReducer(state, deleteTopic(mockTopic.id));
    
    expect(actualState.topics).toHaveLength(0);
  });

  test('should not modify state for unknown action type', () => {
    const state = {
      ...initialState,
      topics: [mockTopic],
    };
    
    const actualState = topicReducer(state, { type: 'unknown' });
    
    expect(actualState).toEqual(state);
  });

  test('should handle multiple topics in state', () => {
    const topics = [
      mockTopic,
      { ...mockTopic, id: '2', title: 'Topic 2' },
      { ...mockTopic, id: '3', title: 'Topic 3' },
    ];
    
    const state = {
      ...initialState,
      topics,
    };
    
    // Test updating middle topic
    const updatedTopic = { ...topics[1], title: 'Updated Topic 2' };
    const actualState = topicReducer(state, updateTopic(updatedTopic));
    
    expect(actualState.topics).toHaveLength(3);
    expect(actualState.topics[1]).toEqual(updatedTopic);
    expect(actualState.topics[0]).toEqual(topics[0]);
    expect(actualState.topics[2]).toEqual(topics[2]);
  });

  test('should clear error when setting topics', () => {
    const state = {
      ...initialState,
      error: 'Previous error',
    };
    
    const actualState = topicReducer(state, setTopics([]));
    
    expect(actualState.error).toBeNull();
  });
}); 