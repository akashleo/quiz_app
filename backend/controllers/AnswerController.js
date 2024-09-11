import Answer from "../model/Answer.js";

export const getAllAnswers = async (req, res, next) => {
  let answers;
  try {
    answers = await Answer.find();
  } catch (err) {
    console.log(err);
  }

  if (!answers) {
    return res.status(404).json({ message: "No answers found" });
  }
  return res.status(200).json({ answers });
};

export const getAnswerById = async (req, res, next) => {
  const id = req.params.id;
  let answer;
  try {
    answer = await Answer.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!answer) {
    return res.status(404).json({ message: "No answer found" });
  }
  return res.status(200).json({ answer });
};

export const createNewAnswer = async (req, res, next) => {
  const { userId, answers, topicId } = req.body;
  let answer;
  try {
    answer = new Answer({
      userId,
      answers,
      topicId,
    });
    await answer.save();
  } catch (err) {
    console.log(err);
  }

  if (!answer) {
    return res.status(500).json({ message: "Unable to add answer" });
  }
  return res.status(201).json({ answer });
};

export const updateAnswer = async (req, res, next) => {
  const { userId, answers, topicId } = req.body;
  let answer;

  const id = req.params.id;
  console.log(id);

  try {
    answer = await Answer.findByIdAndUpdate(id, {
      userId,
      answers,
      topicId,
    });

    await answer.save();
  } catch (err) {
    console.log(err);
  }

  if (!answer) {
    return res
      .status(500)
      .json({ message: "Unable to update answer with this id" });
  }
  return res.status(201).json({ answer });
};

export const deleteAnswer = async (req, res, next) => {
  let answer;
  const id = req.params.id;

  try {
    answer = await Answer.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!answer) {
    return res
      .status(500)
      .json({ message: "Unable to delete answer with this id" });
  }
  return res
    .status(201)
    .json({ answer, message: "Answer successfully deleted" });
};
