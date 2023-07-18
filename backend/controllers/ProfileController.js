import Profile from "../model/Profile.js";

export const getAllProfiles = async (req, res, next) => {
  let profiles;
  try {
    profiles = await Profile.find();
  } catch (err) {
    console.log(err);
  }

  if (!profiles) {
    return res.status(404).json({ message: "No profiles Found" });
  }
  return res.status(200).json({ profiles });
};

export const getProfileById = async (req, res, next) => {
  const id = req.params.id;
  let profile;
  try {
    profile = await Profile.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(404).json({ message: "No profile Found" });
  }
  return res.status(200).json({ profile });
};
export const addProfile = async (req, res, next) => {
  const {
    email,
    password,
    fullName,
    level,
    quizPassed,
    fastestTime,
    correctAnswers,
    achievements,
    featuredCategory,
    image,
  } = req.body;
  let profile;
  try {
    profile = new Profile({
      email,
      password,
      fullName,
      level,
      quizPassed,
      fastestTime,
      correctAnswers,
      achievements,
      featuredCategory,
      image,
    });
    await profile.save();
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ profile });
};

export const updateProfile = async (req, res, next) => {
  const {
    email,
    password,
    fullName,
    level,
    quizPassed,
    fastestTime,
    correctAnswers,
    achievements,
    available,
    featuredCategory,
    image,
  } = req.body;
  let profile;

  const id = req.params.id;

  try {
    profile = await Profile.findByIdAndUpdate(id, {
      email: email,
      password: password,
      fullName : fullName,
      level,
      quizPassed,
      fastestTime,
      correctAnswers,
      achievements,
      featuredCategory,
      available: available,
      image,
    });

    await profile.save();
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json({ profile });
};

export const deleteProfile = async (req, res, next) => {
  let profile;
  const id = req.params.id;

  try {
    profile = await Profile.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res
    .status(201)
    .json({ profile, message: "Product successfully deleted" });
};

// exports.getAllProfiles = getAllProfiles;
// exports.addProfile = addProfile;
// exports.getProfileById = getProfileById;
// exports.updateProfile = updateProfile;
// exports.deleteProfile = deleteProfile;
