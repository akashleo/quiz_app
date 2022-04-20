const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  instructions: {
    type: String,
    required: true,
  },
  topicId: {
    type: Number,
    required: true,
  },

  timestamps: true, // for createdAt, and updatedAt
  available: {
    // important later @protyush add this to every Schema
    type: Boolean,
  },
  maxAttempts: {
    type: String,
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
});

module.exports = mongoose.model("Topic", topicSchema);
