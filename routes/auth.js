import express from "express";
import { authController } from "../controllers/authController.js";

const router = express.Router();

// login request
router.post("/",authController);

export default router;