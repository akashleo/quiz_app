import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TopicSchema = new Schema(
  {
    instructions: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
    },
    maxAttempts: {
      type: Number,
      required: true,
    },
    timeLimit: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Topic", TopicSchema);

//module.exports = mongoose.model("Topic", topicSchema);
