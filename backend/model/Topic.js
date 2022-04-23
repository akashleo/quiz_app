const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  instructions: {
    type: String,
    required: true,
  },
  
  timestamps: true, // for createdAt, and updatedAt @protyush
  available: {
    // important later @protyush add this to every Schema
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
