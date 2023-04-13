import express from 'express'
import AuthControllers from "../controllers/pdfControllers";
const router = express.Router();
import verifyToken from '../middleware/verifyToken';


//  pdf creat
router.post("/createPdf/:id", verifyToken, AuthControllers.createPdf);

//  show show pdf id
router.get("/getPdf/:id", verifyToken, AuthControllers.getPdf);

// update
router.put("/updatePdf/:pdfId", verifyToken, AuthControllers.updatePdf);

//  delete pdf
router.delete("/deletPdf/:pdfId", verifyToken, AuthControllers.deletPdf);

//  delete pdf
router.get("/" ,(req, res) => {
    res.send("hello world")
});

export default router;
