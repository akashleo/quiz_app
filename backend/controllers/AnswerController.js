import Answer from "../model/Answer.js";
import Topic from "../model/Topic.js";
import Question from "../model/Question.js";
import Grades from "../model/Grades.js";
import Profile from "../model/Profile.js";
import { emojiMap } from "../EmojiMap.js";
import mongoose from "mongoose";

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

  // Validate required fields
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  if (!topicId) {
    return res.status(400).json({ message: "topicId is required" });
  }

  let answer;
  try {
    answer = new Answer({
      userId,
      answers: answers || new Map(),
      topicId,
    });
    await answer.save();
  } catch (err) {
    console.error("Error creating answer:", err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: errorMessages 
      });
    }
    
    return res.status(500).json({ message: "Unable to create answer due to server error" });
  }

  return res.status(201).json({ answer });
};

export const updateAnswer = async (req, res, next) => {
  const { answers } = req.body;
  const id = req.params.id;

  // Validate input
  if (!id) {
    return res.status(400).json({ message: "Answer ID is required" });
  }

  if (!answers) {
    return res.status(400).json({ message: "Answers data is required" });
  }

  try {
    // First check if the answer exists
    const existingAnswer = await Answer.findById(id);
    if (!existingAnswer) {
      return res.status(404).json({ message: "Answer not found with this id" });
    }

    // Update the answer
    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      { answers },
      { new: true, runValidators: true }
    );

    if (!updatedAnswer) {
      return res.status(500).json({ message: "Failed to update answer" });
    }

    return res.status(200).json({ answer: updatedAnswer });
  } catch (err) {
    console.error("Error updating answer:", err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: errorMessages 
      });
    }
    
    // Handle cast errors (invalid ObjectId)
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid answer ID format" });
    }
    
    return res.status(500).json({ message: "Unable to update answer due to server error" });
  }
};

/**
 * Calculate quiz duration in minutes
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns {number} duration in minutes
 */
const calculateDuration = (startTime, endTime) => {
  const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60); // Convert to minutes
  return Math.round(duration * 100) / 100; // Round to 2 decimal places
};

/**
 * Get emoji based on marks
 * @param {number} marks
 * @returns {string} emoji unicode
 */
const getAchievementEmoji = (marks) => {
  // Map marks to emoji index (0-10)
  const emojiIndex = Math.min(Math.floor(marks), 10);
  return emojiMap[emojiIndex];
};

export const submitAnswer = async (req, res, next) => {
  const { submitted } = req.body;
  const id = req.params.id;

  if (submitted !== true) {
    return res
      .status(400)
      .json({
        message: "Invalid submission request. 'submitted' must be true.",
      });
  }

  try {
    // 1. Get the answer document and verify it exists
    const answerDoc = await Answer.findById(id);
    if (!answerDoc) {
      return res.status(404).json({ message: "Answer not found." });
    }

    if (answerDoc.submitted) {
      return res
        .status(400)
        .json({ message: "This quiz has already been submitted." });
    }

    // 2. Calculate duration
    const duration = calculateDuration(answerDoc.createdAt, new Date());

    // 3. Get all questions and calculate marks
    // Convert Mongoose Map to array of entries
    const answersArray = Array.from(answerDoc.answers);

    // Extract question IDs (first element of each entry is the key)
    const questionIds = answersArray
      .map(([key]) => key)
      .filter((key) => {
        const isValid = mongoose.Types.ObjectId.isValid(key);
        return isValid;
      });

    if (questionIds.length === 0) {
      return res.status(400).json({
        message: "No valid answers found",
        answers: Object.fromEntries(answersArray),
        answerDoc,
      });
    }

    // Convert string IDs to ObjectIds
    const objectIds = questionIds.map((id) => new mongoose.Types.ObjectId(id));

    const questions = await Question.find({
      _id: { $in: objectIds },
    }).lean();

    console.log("Found Questions:", questions.length); // Debug log

    if (!questions || questions.length === 0) {
      return res.status(400).json({
        message: "No questions found for the given answers",
        questionIds,
        answers: Object.fromEntries(answersArray),
      });
    }

    let correctAnswers = 0;
    questions.forEach((question) => {
      const userAnswer = answerDoc.answers.get(question._id.toString());
      if (userAnswer && parseInt(userAnswer) === question.isCorrect) {
        correctAnswers++;
      }
    });

    // Get achievement emoji before creating grade
    const achievementEmoji = getAchievementEmoji(correctAnswers);

    // 4. Create new grade instance with achievement
    const grade = new Grades({
      userId: answerDoc.userId,
      topicId: answerDoc.topicId,
      marks: correctAnswers,
      achievement: achievementEmoji,
    });
    await grade.save();

    // 5. Update user profile
    const userProfile = await Profile.findById(answerDoc.userId);
    if (!userProfile) {
      throw new Error("User profile not found");
    }

    // Update achievements array
    if (!userProfile.achievements) {
      userProfile.achievements = [];
    }
    userProfile.achievements.push(achievementEmoji);

    // Update fastestTime
    const currentFastestTime = userProfile.fastestTime;
    if (
      !currentFastestTime ||
      currentFastestTime === "" ||
      parseFloat(duration) < parseFloat(currentFastestTime)
    ) {
      userProfile.fastestTime = duration.toString();
    }

    // Update quizPassed
    if (correctAnswers >= 5) {
      const currentPassed = parseInt(userProfile.quizPassed || "0");
      userProfile.quizPassed = (currentPassed + 1).toString();
    }

    // Update correctAnswers
    const currentCorrectAnswers = parseInt(userProfile.correctAnswers || "0");
    userProfile.correctAnswers = currentCorrectAnswers + correctAnswers;

    // Calculate and update level if needed
    const currentLevel = parseInt(userProfile.level || "1");
    const answersNeededForNextLevel = currentLevel * 10;
    if (userProfile.correctAnswers >= answersNeededForNextLevel) {
      userProfile.level = (currentLevel + 1).toString();
    }

    // Save profile updates
    await userProfile.save();

    // 6. Mark answer as submitted and save
    answerDoc.submitted = true;
    await answerDoc.save();

    // 7. Return success response with all updated data
    return res.status(200).json({
      message: "Quiz successfully submitted",
      data: {
        grade: {
          marks: correctAnswers,
          total: questions.length,
        },
        duration,
        achievement: achievementEmoji,
        profile: {
          fastestTime: userProfile.fastestTime,
          quizPassed: userProfile.quizPassed,
          correctAnswers: userProfile.correctAnswers,
          achievements: userProfile.achievements,
          level: userProfile.level
        },
      },
    });
  } catch (err) {
    console.error("Error during quiz submission:", err);
    return res.status(500).json({
      message: "An error occurred during quiz submission",
      error: err.message,
    });
  }
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

export const getAllAnswersByProfileId = async (req, res, next) => {
  const profileId = req.params.id;

  try {
    // Validate if profileId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ 
        message: "Invalid profile ID format" 
      });
    }

    // Find all answers for the given profile ID and populate topic details
    const answers = await Answer.find({ userId: profileId })
      .populate({
        path: 'topicId',
        select: 'name description',
        model: Topic
      })
      .sort({ createdAt: -1 })
      .lean();

    if (!answers || answers.length === 0) {
      return res.status(404).json({ 
        message: "No answers found for this profile" 
      });
    }

    // Process each answer
    const answersWithDetails = await Promise.all(answers.map(async (answer) => {
      // Get all question IDs from the answers object (not Map since we used .lean())
      const questionIds = Object.keys(answer.answers)
        .filter(key => mongoose.Types.ObjectId.isValid(key))
        .map(id => new mongoose.Types.ObjectId(id));

      // Fetch all questions for this answer
      const questions = await Question.find({
        _id: { $in: questionIds }
      }).select('questionText options isCorrect').lean();

      // Calculate correct answers and prepare reviewed answers
      let correctCount = 0;
      const reviewedAnswers = questions.map(question => {
        const userAnswer = answer.answers[question._id.toString()];
        const isCorrect = userAnswer && parseInt(userAnswer) === question.isCorrect;
        if (isCorrect) correctCount++;

        return {
          questionId: question._id,
          questionText: question.questionText,
          userAnswer: userAnswer ? parseInt(userAnswer) : null,
          correctAnswer: question.isCorrect,
          options: question.options,
          isCorrect: isCorrect
        };
      });

      // Calculate score percentage
      const scorePercentage = questions.length > 0 
        ? Math.round((correctCount / questions.length) * 100) 
        : 0;

      // Return enhanced answer object
      return {
        _id: answer._id,
        topic: answer.topicId,
        submittedAt: answer.createdAt,
        submitted: answer.submitted,
        reviewedAnswers,
        score: {
          correct: correctCount,
          total: questions.length,
          percentage: scorePercentage
        }
      };
    }));

    return res.status(200).json({
      message: "Successfully retrieved answers",
      data: answersWithDetails
    });

  } catch (error) {
    console.error("Error fetching answers by profile ID:", error);
    return res.status(500).json({
      message: "An error occurred while fetching answers",
      error: error.message
    });
  }
};
