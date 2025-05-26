import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
    },
    quizPassed: {
      type: String,
    },
    fastestTime: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    achievements: [String],
    correctAnswers: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    available: {
      type: Boolean,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
//module.exports = mongoose.model("Profile", profileSchema);
