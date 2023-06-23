const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    answers: { type: Map, of: String },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
