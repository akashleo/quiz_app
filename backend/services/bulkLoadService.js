import mongoose from 'mongoose';
import Question from "../model/Question.js";
import Topic from "../model/Topic.js";

export const bulkInsertQuestions = async (req, res) => {
  const questionList = req.body; // Assuming you're sending questions in the request body as an array

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Iterate through the questions and insert them one by one
    for (const questionData of questionList) {
      const question = new Question(questionData);
      await question.save({ session });

      // Assuming you have a 'topics' field in the question schema that's an array of Topic IDs
      for (const topicId of question.topics) {
        const topic = await Topic.findById(topicId);
        if (topic) {
          topic.questions.push(question);
          await topic.save({ session });
        }
      }
    }

    await session.commitTransaction();
    session.endSession();

    //res.status(201).json({ message: 'Bulk questions inserted successfully' }); 
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
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting questions' });
  }
};

