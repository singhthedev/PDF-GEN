import express from "express";
import passport from "passport";
import User from "../models/passportModel";
import * as dotenv from "dotenv";
dotenv.config();
var router = express.Router();
import "../config/db";
import "../modules/passport";
import jwt from "jsonwebtoken";
import verifytoken from "../middleware/verifyToken";


//google login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.clientUrl}?token=error`,
  }),
  (req, res) => {
    console.log("this is user", req.user);
    // Redirect to the client with the token
    const user = req.user;
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }
    try {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.redirect(`${process.env.clientUrl}?token=${token}`);
    } catch (error) {
      res.status(500).json({ message: "Error generating token" });
    }
  }
);

// verify token
router.get("/verify", async (req, res) => {
  try {
    const token = req.query.token;
    if(!token){
      return res.status(400).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user._id);
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }
      return res.status(200).json({ message: "Token verified", data:{decoded,user}});
  } catch (error) {
    return res.status(400).json({ message: "Token not verified", error });
  }
});



// get all user
router.get("/alluser", verifytoken, async (req, res, next) => {
  try {
    let data = await User.find({ });
    return res.json({ data });
  } catch (error) {
    next(error);
  }
});

// delete user
router.delete("/deleteuser/:_id", verifytoken, async (req, res, next) => {
  try {
    let userdata = await User.findByIdAndDelete({ _id: req.params._id });
    return res.json("User is delete", { userdata });
  } catch (error) {
    next(error);
  }
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie("clear");
	req.logout();
	res.redirect(process.env.clientUrl);
});


export default router;
