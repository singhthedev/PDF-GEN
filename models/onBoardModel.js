import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  skill_id:[{type: mongoose.Types.ObjectId , ref: 'skill'}],
  userName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profileImage: {
    imgUrl: {
      type: String,
      required: true,
    },
  },
  coverImage: {
    imgUrl: {
      type: String,
    },
  },
  workExprience: [
    {
      workTitle: { type: String, require: false },
      workHeading: { type: String, require: false },
      companyName: { type: String, require: false },
      skill: { type: String, require: false },
      date: { type: String, require: false },
      post: { type: String, require: false },
      location: { type: String, require: false },
      url: { type: String, require: false },
    },
  ],
  recentWork: [
    {
      recentTitle: { type: String, require: false },
      recentHeading: { type: String, require: false },
      projectName: { type: String, require: false },
      techTools: { type: String, require: false },
    },
  ],
  summary: {
    summaryTitle: { type: String, require: false },
    summaryDescription: { type: String, require: false },
  },
});
module.exports = mongoose.model("onboard", imageSchema);