const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradesSchema = new Schema({
  userId: {
    // type: Number,
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  topicId: {
    // type: Number,
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  timestamps: true, // for createdAt, and updatedAt
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Grades", gradesSchema);
