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
  let question;
  const id = req.params.id;

  try {
    // Find and remove the question by ID
    question = await Question.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting question" });
  }

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Update the topic to remove the question ID
  try {
    await Topic.updateOne(
      { _id: question.topicId }, // Assuming the question has a topicId field
      { $pull: { questions: id } } // Remove the question ID from the topic's questionIds array
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating topic" });
  }

  let questions;
  try {
    // Fetch the updated list of questions
    questions = await Question.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Cannot get questions" });
  }

  if (!questions) {
    return res.status(500).json({ message: "Cannot get questions" });
  }

  return res
    .status(200)
    .json({ questions, message: "Question successfully deleted" });
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

  try {
    questions = await fetch(
      `https://opentdb.com/api.php?amount=${req.body.params.count}&category=${req.body.params.category}&difficulty=medium&type=multiple`
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error fetching questions from API" });
  }

  let topic;

  try {
    topic = await Topic.findOne({ code: req.body.params.category });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error fetching topic from database" });
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
        topicId: topic._id, // Use topic._id directly since we are using findOne
      };
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error processing questions JSON" });
  }

  try {
    insertedQuestions = await Question.insertMany(modifiedQJSON);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error inserting questions into database" });
  }

  if (!insertedQuestions) {
    return res.status(500).json({ message: "Cannot get questionsJson" });
  }

  // Push the newly created question IDs into the topic object
  try {
    const questionIds = insertedQuestions.map((question) => question._id);
    await Topic.updateOne(
      { _id: topic._id },
      { $addToSet: { questions: { $each: questionIds } } } // Assuming questionIds is an array in the Topic schema
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error updating topic with question IDs" });
  }

  let questionsList;
  try {
    questionsList = await Question.find();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error fetching questions from database" });
  }

  if (questionsList) {
    return res.status(201).json({
      questions: questionsList,
      message: "Questions successfully loaded and topic updated",
    });
  } else {
    return res.status(500).json({ message: "Cannot get questionsJson" });
  }
};

export const fetchQuestionById = async (req, res, next) => {
  const id = req.params.id; // Get the question ID from the request parameters
  let question;

  try {
    // Fetch the question by ID
    question = await Question.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching question" });
  }

  // Check if the question was found
  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Create a new object excluding the isCorrect property
  const { isCorrect, ...questionWithoutIsCorrect } = question._doc; // Use _doc to access the plain object

  // Return the found question without the isCorrect property
  return res.status(200).json({ question: questionWithoutIsCorrect });
};
