const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
  categoryId: {
    type: Number,
    required: true,
  },
  timestamps: true, // for createdAt, and updatedAt
  available: {
    // important later @protyush add this to every Schema
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
