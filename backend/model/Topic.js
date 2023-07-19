import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TopicSchema = new Schema(
  {
    name:{
      type: String,
      required: true,
    },
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
    image: {
      type: String,
      required: false,
    }, 
    code: {
      type: Number,
      required: false,
    },
    questions: [{type: mongoose.Types.ObjectId, ref: "Question", required: true}]
  },
  { timestamps: true }
);

export default mongoose.model("Topic", TopicSchema);

//module.exports = mongoose.model("Topic", topicSchema);
