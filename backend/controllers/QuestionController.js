import Question from "../model/Question.js";
import Topic from "../model/Topic.js";
import { bulkInsertQuestions } from "../services/bulkLoadService.js";
import mongoose from "mongoose";
import fetch from "node-fetch";

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

export const getArchivedQuestions = async (req, res, next) => {
  let questions;
  try {
    questions = await Question.find({ available: false });
  } catch (err) {
    console.log(err);
  }

  if (!questions) {
    return res.status(404).json({ message: "No Archived questions Found" });
  }
  return res.status(200).json({ questions });
};

export const addQuestion = async (req, res, next) => {
  const { questionText, options, isCorrect, available, image, topicId } =
    req.body;

  let topic;

  try {
    topic = await Topic.findById(mongoose.Types.ObjectId(topicId));
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
    topicId,
  });

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
  // return res.status(201).json({ question });
  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    console.log(err);
  }

  if (!questions) {
    return res.status(404).json({ message: "No questions Found" });
  }
  return res.status(200).json(question);
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
  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    console.log(err);
  }

  if (!question && !questions) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json(questions);
};

export const deleteQuestion = async (req, res, next) => {
  const { questionId } = req.params; // Assuming the question ID is passed as a URL parameter

  let question;

  // Validate the question ID
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Find the question to delete
    question = await Question.findById(questionId).session(session);
    if (!question) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Question not found" });
    }

    // Find the topic associated with the question
    const topic = await Topic.findById(question.topicId).session(session);
    if (topic) {
      // Remove the question from the topic's questions array
      topic.questions.pull(questionId);
      await topic.save({ session });
    }

    // Delete the question
    await Question.findByIdAndDelete(questionId).session(session);
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting question" });
  }

  return res.status(200).json({ message: "Question deleted successfully" });
};

// export const deleteQuestion = async (req, res, next) => {
//   let question;
//   const id = req.params.id;

//   try {
//     question = await Question.findByIdAndRemove(id);
//   } catch (err) {
//     console.log(err);
//   }

//   if (!question) {
//     return res.status(500).json({ message: "Unable to delete by this id" });
//   }
//   let questions;
//   try {
//     questions = await Question.find();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!questions) {
//     return res.status(500).json({ message: "Cannot get questions" });
//   }
//   return res
//     .status(201)
//     .json({ questions, message: "Question successfully deleted" });
// };

export const loadQuestionByTopic = async (req, res, next) => {
  let questions;
  let modifiedQJSON;
  let insertedQuestions;
  //console.log(`https://opentdb.com/api.php?amount=${req.body.params.count}&category=${req.body.params.category}&difficulty=medium&type=multiple`)
  try {
    questions = await fetch(
      `https://opentdb.com/api.php?amount=${req.body.params.count}&category=${req.body.params.category}&difficulty=medium&type=multiple`
    );
  } catch (err) {
    console.log(err);
  }

  let topic;

  try {
    topic = await Topic.find({ code: req.body.params.category });
  } catch (err) {
    console.log(err);
  }
  if (!topic) {
    return res
      .status(400)
      .json({ message: "Unable to find topic with this id" });
  }

  try {
    const questionsJson = await questions.json();
    modifiedQJSON = questionsJson.results.map((item) => {
      let correctindex = Math.floor(Math.random() * 4);
      let modifiedOptions = [...item.incorrect_answers];
      modifiedOptions.splice(correctindex, 0, item.correct_answer);
      const optionsArr = modifiedOptions.map((option, index) => {
        return {
          id: index + 1,
          text: option,
        };
      });
      return {
        questionText: item.question,
        available: true,
        options: optionsArr,
        isCorrect: correctindex + 1,
        image: req.body.image.url,
        topicId: topic[0]._id,
      };
    });
  } catch (err) {
    console.log(err);
  }

  try {
    insertedQuestions = await Question.insertMany(modifiedQJSON);
  } catch (err) {
    console.log(err);
  }

  if (!insertedQuestions) {
    return res
      .status(500)
      .json({ ...req.body, message: "Cannot get questionsJson" });
  }
  let questionsList;
  try {
    questionsList = await Question.find();
  } catch (err) {
    console.log(err);
  }

  if (questionsList) {
    return res.status(201).json({
      questions: questionsList,
      message: "Question successfully loaded",
    });
  } else {
    return res
      .status(500)
      .json({ modifiedQJSON, message: "Cannot get questionsJson" });
  }
};
