import mongoose from "mongoose";

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    answers: { type: Map, of: String },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
