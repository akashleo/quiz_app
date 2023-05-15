import Question from "../model/Question.js";
import Topic from "../model/Topic.js";

export const getAllQuestions = async (req, res, next) => {
  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    console.log(err);
  }

  if (!questions) {
    return res.status(404).json({ message: "No questions Found" });
  }
  return res.status(200).json({ questions });
};

export const addQuestion = async (req, res, next) => {
  const { questionText, options, isCorrect, available, image, topicId } =
    req.body;

  let topic;

  try {
    topic = await Topic.findById(topicId);
  } catch (err) {
    console.log(err);
  }

  if (!topic) {
    return res
      .status(400)
      .json({ message: "Unable to find topic with this id" });
  }

  let question = new Question({
    questionText,
    available,
    options,
    isCorrect,
    image,
  });
  // try {
  //   question = new Question({
  //       questionText,
  //       available,
  //       options,
  //       isCorrect,
  //       image,
  //   });
  //   await question.save();
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await question.save({ session });
    topic.questions.push(question);
    await topic.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  if (!question) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ question });
};

export const updateQuestion = async (req, res, next) => {
  const { questionText, available, options, isCorrect, image } = req.body;
  let question;

  const id = req.params.id;

  try {
    question = await Question.findByIdAndUpdate(id, {
      questionText,
      available,
      options,
      isCorrect,
      image,
    });

    await question.save();
  } catch (err) {
    console.log(err);
  }

  if (!question) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json({ question });
};

export const deleteQuestion = async (req, res, next) => {
  let question;
  const id = req.params.id;

  try {
    question = await Question.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!question) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res
    .status(201)
    .json({ question, message: "Grade successfully deleted" });
};
