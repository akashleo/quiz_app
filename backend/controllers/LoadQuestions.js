import axios from "axios";
import Question from "../model/Question.js";
import Topic from "../model/Topic.js";
import mongoose from "mongoose";
const URL =
  "https://opentdb.com/api.php?amount=amtCount&category=categoryId&difficulty=medium&type=multiple";

async function fetchDataFromAPI(params) {
  const url = URL.replace("amtCount", params.amtCount).replace(
    "categoryId",
    params.categoryId
  );

  try {
    const response = await axios.get(url);
    return response.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const addQuestion = async (body) => {
  const { questionText, options, isCorrect, available, image, topicId } = body;

  let topic;

  try {
    topic = await Topic.findById(mongoose.Types.ObjectId(topicId));
  } catch (err) {
    console.log(err);
  }

//   if (!topic) {
//     return res
//       .status(400)
//       .json({ message: "Unable to find topic with this id" });
//   }

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
    //return res.status(500).json({ message: err });
  }
};

export const loadAndTransformQuestions = async (req, res, next) => {
  const fetchedQuestions = await fetchDataFromAPI(req.body.params);

  if (fetchedQuestions) {
    for (const question of fetchedQuestions) {
      const correctOption = Math.ceil(Math.random * 4);
      const optionsArr = [...question.incorrect_answers];
      optionsArr.splice(correctOption, 0, question.correct_answer);
      const modifiedQuestion = {
        options: [
          { id: 1, text: optionsArr[0] },
          { id: 2, text: optionsArr[1] },
          { id: 3, text: optionsArr[2] },
          { id: 4, text: optionsArr[3] },
        ],
        isCorrect: correctOption,
        topicId: req.body.topicId,
        available: "true",
        questionText: question.question,
        image: req.body.imageUrl,
      };
      await addQuestion(modifiedQuestion);
    }
  }
};
