import { v2 as cloudinary } from "cloudinary";
import onboard from "../models/onBoardModel";
import skill from "../models/skillModel";
import _ from "lodash";


cloudinary.config({
  cloud_name: "dhfmfcjt7",
  api_key: "547384683964197",
  api_secret: "Vi7QLe4aBrfCM4dVHgSX6QtlO3k",
});

// user on board api
exports.useronBoard = async (req, res) => {
  try {
    const imgFiles = req.files.profileImage;
    const coverImageFile = req.files.coverImage
      ? req.files.coverImage[0]
      : null;
    const {
      skill_id: [...skill_id],
      userName,
      designation,
      bio,
      workExprience: [
        {
          workTitle,
          workHeading,
          companyName,
          skill,
          date,
          post,
          location,
          url,
        },
      ],
      recentWork: [{ recentTitle, recentHeading, projectName, techTools }],
      summary: { summaryTitle, summaryDescription },
    } = req.body;
    const imgUploadPromises = imgFiles.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "userImages/",
      });
    });
    const [coverImageUpload, ...imgUploads] = await Promise.all([
      coverImageFile &&
        cloudinary.uploader.upload(coverImageFile.path, {
          folder: "userImages/",
        }),
      ...imgUploadPromises,
    ]);
    const profileImage = imgUploads.length > 0
      ? { imgUrl: imgUploads[0].secure_url }
      : null;

    const data = new onboard({
      skill_id: [...skill_id],
      userName,
      designation,
      bio,
      profileImage,
      coverImage: coverImageUpload
        ? { imgUrl: coverImageUpload.secure_url }
        : null,
      workExprience: [
        {
          workTitle,
          workHeading,
          companyName,
          skill,
          date,
          post,
          location,
          url,
        },
      ],
      recentWork: [{ recentTitle, recentHeading, projectName, techTools }],
      summary: { summaryTitle, summaryDescription },
    });
    await data.save();
    res.status(201).json({
      message: "Submit successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while uploading the image.",
      error,
    });
  }
};


// skill  post api
exports.uploadskills = async (req, res, next) => {
  try {
    const { title, description, keywords, tags, category } = req.body;
    const { path: tempPath, filename } = req.file;
    if (!filename || !title || !description || !keywords || !tags || !category) {
      res.status(400).json({ message: "All fields are required" });
    } else {
      // Upload the Image to Cloudinary
      const { secure_url } = await cloudinary.uploader.upload(tempPath, {
        folder: "userImages/",
      });
      // create the skill
      const doc = new skill({ 
        logo: secure_url,
        title,
        description,
        keywords,
        tags,
        category
      
      });
      // save the skill
      const skillsave = await doc.save();
      if (skillsave?._id) {
        return res.status(201).json({
          message: "Submit successfully!",
        });
      } else {
        res.status(400).json({ error: error });
      }
    }
  } catch (error) {
    next(error);
  }
};


// onboard get api by id
exports.getonboarding = async (req, res) => {
  try {
    const data = await onboard.find()
    .populate("skill_id", "logo title description keywords tags category");
    res.status(200).json({
      data: _.reverse(data),
      message: "retrieved successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the data.",
      error,
    });
  }
};



// skill  get api by id
exports.getskills = async (req, res) => {
  try {
    const data = await skill.find();
    res.status(200).json({
      message: "Images retrieved successfully!",
        data
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the images.",
      error,
    });
  }
};


