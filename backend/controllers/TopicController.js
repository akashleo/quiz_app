import Topic from "../model/Topic.js";
import Question from "../model/Question.js";
import { categories } from "./Topics.js";

export const getAllTopics = async (req, res, next) => {
  let topics;
  try {
    topics = await Topic.find();
  } catch (err) {
    console.log(err);
  }

  if (!topics) {
    return res.status(404).json({ message: "No topics Found" });
  }
  return res.status(200).json({ topics });
};

export const loadAllTopics = async (req, res, next) => {
  let topic;
  for(const category of categories){
    try {
      const { instructions, available, maxAttempts, timeLimit, points, name, id } =
      category;
      topic = new Topic({
        instructions,
        available,
        maxAttempts,
        timeLimit,
        points,
        name,
        code: id
      });
      await topic.save();
    } catch (err) {
      console.log(err);
    }
  }
  

  if (!topic) {
    return res.status(404).json({ message: "No topics Found" });
  }
  return res.status(200).json({ topic });
};

export const addTopic = async (req, res, next) => {
  const { instructions, available, maxAttempts, timeLimit, points, name } =
    req.body;

  let topic;
  try {
    topic = new Topic({
      instructions,
      available,
      maxAttempts,
      timeLimit,
      points,
      name,
    });
    await topic.save();
  } catch (err) {
    console.log(err);
  }

  let topics;
  try {
    topics = await Topic.find();
  } catch (err) {
    console.log(err);
  }

  if (!topic) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ topics });
};

export const updateTopic = async (req, res, next) => {
  const { instructions, available, maxAttempts, timeLimit, points, name } =
    req.body;
  let topic;

  const id = req.params.id;

  try {
    topic = await Topic.findByIdAndUpdate(id, {
      instructions,
      available,
      maxAttempts,
      timeLimit,
      points,
      name,
    });

    await topic.save();
  } catch (err) {
    console.log(err);
  }

  if (!topic) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json({ topic });
};

export const deleteTopic = async (req, res, next) => {
  let topic;
  const id = req.params.id;

  try {
    topic = await Topic.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  let topics;
  try {
    topics = await Topic.find();
  } catch (err) {
    console.log(err);
  }

  if (!topic) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res.status(201).json({ topics , message: "Topic successfully deleted" });
};

export const clearTopicQuestions = async (req, res, next) => {
  const id = req.params.id;
  let topic;

  try {
    // Find the topic by ID
    topic = await Topic.findById(id);
    
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Delete all questions referenced in the topic's questions array
    if (topic.questions && topic.questions.length > 0) {
      await Question.deleteMany({ _id: { $in: topic.questions } });
    }

    // Clear the questions array
    topic.questions = [];
    
    // Save the updated topic
    await topic.save();

    return res.status(200).json({ 
      message: "Topic questions cleared successfully", 
      topic 
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 
      message: "Error clearing topic questions", 
      error: err.message 
    });
  }
};
