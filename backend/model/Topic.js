const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  instructions: {
    type: String,
    required: true,
  },

  timestamps: true,
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
});

module.exports = mongoose.model("Topic", topicSchema);
