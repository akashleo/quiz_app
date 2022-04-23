const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    answers: { type: Map, of: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAnswers", topicSchema);
