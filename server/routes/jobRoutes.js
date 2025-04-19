import express from "express";
import { applyJob, getJob, postJob } from "../controllers/jobcontrollers.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get('/',getJob);
router.post('/post', verifyToken, postJob);
router.post('/apply/:jobId',verifyToken, applyJob);

export default router;