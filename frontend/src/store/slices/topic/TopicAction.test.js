import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchTopics,
  createTopic,
  updateTopicAction,
  deleteTopicAction,
} from './TopicAction';
import { mockTopic } from '../../../utils/test-utils';

// Mock axios
jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Topic Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      topic: {
        topics: [],
        loading: false,
        error: null,
      },
    });
    // Clear all axios mocks before each test
    jest.clearAllMocks();
  });

  describe('fetchTopics', () => {
    test('creates SET_TOPICS when fetching topics has been done', async () => {
      const topics = [mockTopic];
      axios.get.mockResolvedValueOnce({ data: topics });

      await store.dispatch(fetchTopics());
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[0].payload).toBe(true);
      expect(actions[1].type).toBe('topic/setTopics');
      expect(actions[1].payload).toEqual(topics);
    });

    test('creates SET_ERROR when fetching topics fails', async () => {
      const error = new Error('Network Error');
      axios.get.mockRejectedValueOnce(error);

      await store.dispatch(fetchTopics());
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/setError');
      expect(actions[1].payload).toBe(error.message);
    });
  });

  describe('createTopic', () => {
    const newTopic = {
      title: 'New Topic',
      description: 'New Description',
    };

    test('creates ADD_TOPIC when creating topic has been done', async () => {
      const createdTopic = { ...newTopic, id: '1' };
      axios.post.mockResolvedValueOnce({ data: createdTopic });

      await store.dispatch(createTopic(newTopic));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/addTopic');
      expect(actions[1].payload).toEqual(createdTopic);
    });

    test('creates SET_ERROR when creating topic fails', async () => {
      const error = new Error('Validation Error');
      axios.post.mockRejectedValueOnce(error);

      await store.dispatch(createTopic(newTopic));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/setError');
      expect(actions[1].payload).toBe(error.message);
    });
  });

  describe('updateTopicAction', () => {
    const updatedTopic = {
      ...mockTopic,
      title: 'Updated Title',
    };

    test('creates UPDATE_TOPIC when updating topic has been done', async () => {
      axios.put.mockResolvedValueOnce({ data: updatedTopic });

      await store.dispatch(updateTopicAction(updatedTopic));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/updateTopic');
      expect(actions[1].payload).toEqual(updatedTopic);
    });

    test('creates SET_ERROR when updating topic fails', async () => {
      const error = new Error('Not Found');
      axios.put.mockRejectedValueOnce(error);

      await store.dispatch(updateTopicAction(updatedTopic));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/setError');
      expect(actions[1].payload).toBe(error.message);
    });
  });

  describe('deleteTopicAction', () => {
    test('creates DELETE_TOPIC when deleting topic has been done', async () => {
      axios.delete.mockResolvedValueOnce({});

      await store.dispatch(deleteTopicAction(mockTopic.id));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/deleteTopic');
      expect(actions[1].payload).toBe(mockTopic.id);
    });

    test('creates SET_ERROR when deleting topic fails', async () => {
      const error = new Error('Not Found');
      axios.delete.mockRejectedValueOnce(error);

      await store.dispatch(deleteTopicAction(mockTopic.id));
      const actions = store.getActions();

      expect(actions[0].type).toBe('topic/setLoading');
      expect(actions[1].type).toBe('topic/setError');
      expect(actions[1].payload).toBe(error.message);
    });
  });

  test('handles API errors with error response data', async () => {
    const errorResponse = {
      response: {
        data: {
          message: 'Custom API Error',
        },
      },
    };
    axios.get.mockRejectedValueOnce(errorResponse);

    await store.dispatch(fetchTopics());
    const actions = store.getActions();

    expect(actions[1].type).toBe('topic/setError');
    expect(actions[1].payload).toBe(errorResponse.response.data.message);
  });
}); 