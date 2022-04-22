const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// image, username, password, Full Name, level, quizPassed, fastestTime, correctAnswers, achievements, featuredCategory

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  quizPassed: {
    type: String,
    required: true,
  },
  fastestTime: {
    type: String,
    required: true,
  },

  achievements: [String],
  featuredCategory: [
    {
      image: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  correctAnswers: {
    type: Number,
    required: true,
  },
  timestamps: true,
  available: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
