import express from "express";
const router = express.Router();
import imageController from "../controllers/onBoardController";
import multer from "multer";
import verifyToken from '../middleware/verifyToken';

const upload = multer({ dest: "public/userImages" });

// onboard post route
router.post(
  "/onboarding",
  upload.fields([
    { name: "profileImage", maxCount: 5 },
    { name: "coverImage", maxCount: 1 },
  ]),
  verifyToken,imageController.useronBoard
);


// image uploade post route
router.post("/skills",upload.single('logo'), verifyToken, imageController.uploadskills
);

// onboarding get route
router.get("/getuser", verifyToken, imageController.getonboarding);

// uplode images get route
router.get("/getskills", verifyToken, imageController.getskills);



module.exports = router;
