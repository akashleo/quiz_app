import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        id: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    isCorrect: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
