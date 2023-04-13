import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  
      logo: { type: String, required: false },
      title: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: String, required: true },
      tags: { type: String, required: true },
      category: { type: String, required: true },
    
});

module.exports = mongoose.model("skill", skillSchema);
