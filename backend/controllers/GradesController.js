import Grades from "../model/Grades.js";

export const getAllGrades = async (req, res, next) => {
  let grades;
  try {
    grades = await Grades.find();
  } catch (err) {
    console.log(err);
  }

  if (!grades) {
    return res.status(404).json({ message: "No grades Found" });
  }
  return res.status(200).json({ grades });
};

export const addGrade = async (req, res, next) => {
  const { userId, topicId, marks } = req.body;
  let grades;
  try {
    grades = new Grades({
      userId,
      topicId,
      marks,
    });
    await grades.save();
  } catch (err) {
    console.log(err);
  }

  if (!grades) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ grades });
};

export const updateGrade = async (req, res, next) => {
  const { userId, topicId, marks } = req.body;
  let grades;
  try {
    grades = new Grades({
      userId,
      topicId,
      marks,
    });
    await grades.save();
  } catch (err) {
    console.log(err);
  }

  if (!grades) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json({ grades });
};

export const deleteGrade = async (req, res, next) => {
  let grade;
  const id = req.params.id;

  try {
    grade = await Grades.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!grade) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res.status(201).json({ grade, message: "Grade successfully deleted" });
};

// exports.getAllProfiles = getAllProfiles;
// exports.addProfile = addProfile;
// exports.getProfileById = getProfileById;
// exports.updateProfile = updateProfile;
// exports.deleteProfile = deleteProfile;
