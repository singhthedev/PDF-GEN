import PDF from "../models/pdfModel";

// post pdf
const createPdf = async (req, res, next) => {
  try {
    const {
      isLogo,
      name,
      post,
      summary,
      education: [{ qualification, fromWhere, when }],
      workExprience: [{ companyname, date }],
      projects = [], // Set default value to an empty array
      skills: { technology, database, apis, realtimeDb },
      tools,
      langaugeSkills,
      contactUs: [{ companyName, email, mobilenumber, location }],
    } = req.body;
    const { id } = req.params;
    if (!name || !post || !summary || !projects || !tools || !langaugeSkills) {
      res.status(400).json({ message: "All fields are required" });
    } else {
      // create the pdf
      const doc = new PDF({
        user_id: id,
        isLogo,
        name,
        post,
        summary,
        education: [{ qualification, fromWhere, when }],
        workExprience: [{ companyname, date }],
        projects,
        skills: { technology, database, apis, realtimeDb },
        tools,
        langaugeSkills,
        contactUs: [{ companyName, email, mobilenumber, location }],
      });
      // save the pdfdetails
      const pdfsave = await doc.save();
      if (pdfsave?._id) {
        return res.status(200).json({
          id: pdfsave._id,
          user_id: pdfsave.user_id,
          isLogo,
          name,
          post,
          summary,
          education: [{ qualification, fromWhere, when }],
          workExprience: [{ companyname, date }],
          projects,
          skills: { technology, database, apis, realtimeDb },
          tools,
          langaugeSkills,
          contactUs: [{ companyName, email, mobilenumber, location }],
        });
      } else {
        res.status(400).json({ error: error });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getPdf = async (req, res, next) => {
  try {
    const { id } = req.params;
    let data = await PDF.find({ user_id: id });
    return res.json({ data });
  } catch (error) {
    next(error);
  }
};
// await User.find({ })
const updatePdf = async (req, res, next) => {
  try {
    const updatePdf = await PDF.findByIdAndUpdate(req.params.pdfId, req.body, {
      new: true,
    });
    if (!updatePdf) {
      return res.status(400).json({ error: { message: "Pdf is not update" } });
    }
    return res.status(200).json({ user: updatePdf });
  } catch (error) {
    next(error);
  }
};

const deletPdf = async (req, res, next) => {
  try {
    const pdfdelete = await PDF.findByIdAndDelete(req.params.pdfId);
    if (!pdfdelete) {
      return res.status(400).json({ error: { message: "pdf not deleted" } });
    }
    return res.status(200).json({ message: "pdf deleted" });
  } catch (error) {
    next(error);
  }
};

export default { createPdf, getPdf, updatePdf, deletPdf };
