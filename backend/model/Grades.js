import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GradesSchema = new Schema(
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
    marks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Grades", GradesSchema);
//module.exports = mongoose.model("Grades", gradesSchema);
