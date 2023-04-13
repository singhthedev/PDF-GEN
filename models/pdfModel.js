import mongoose from "mongoose";

let pdfSchema = new mongoose.Schema({
  isLogo: { type: Boolean },
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  post: { type: String, require: true },
  summary: { type: String, require: true },
  education: [
    {
      qualification: { type: String, require: false },
      fromWhere: { type: String, require: false },
      when: { type: String, require: false },
    },
  ],
  workExprience: [
    {
      companyname: { type: String, require: false },
      date: { type: String, require: false },
    },
  ],
  projects: [
    {
      projectName: { type: String, require: false },
      description: { type: String, require: false },
      responsibility: { type: String, require: false },
      role: { type: String, require: false },
      techTools: { type: String, require: false },
      teamSize: { type: String, require: false },
      url: { type: String, require: false },
    },
  ],
  skills: {
    technology: { type: String, require: false },
    database: { type: String, require: false },
    apis: { type: String, require: false },
    realtimeDb: { type: String, require: false },
  },
  tools: { type: String, require: true },
  langaugeSkills: { type: String, require: true },
  contactUs: [
    {
      companyName: { type: String, require: false },
      email: { type: String, require: false },
      mobilenumber: { type: String, require: false },
      location: { type: String, require: false },
    },
  ],
});

const PDF = mongoose.model("Pdf", pdfSchema);

export default PDF;
