import Topic from "../model/Topic.js";

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


export const addTopic = async (req, res, next) => {
  const {
    instructions,
    available,
    maxAttempts,
    timeLimit,
    points,
  } = req.body;
  let topic;
  try {
    topic = new Topic({
        instructions,
        available,
        maxAttempts,
        timeLimit,
        points,
    });
    await topic.save();
  } catch (err) {
    console.log(err);
  }

  if (!topic) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ topic });
};

export const updateTopic = async (req, res, next) => {
  const {
    instructions,
    available,
    maxAttempts,
    timeLimit,
    points,
  } = req.body;
  let topic;

  const id = req.params.id;

  try {
    topic = await Topic.findByIdAndUpdate(id, {
        instructions,
        available,
        maxAttempts,
        timeLimit,
        points,
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

  if (!topic) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res
    .status(201)
    .json({ topic, message: "Grade successfully deleted" });
};