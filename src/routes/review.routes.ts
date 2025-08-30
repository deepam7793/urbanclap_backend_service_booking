import express from "express";
import { createReview, getProviderReviews } from "../controllers/review.controller";
import { authMiddleware } from "../utils/jwt";

const router = express.Router();

router.post("/", authMiddleware, createReview); // User adds review
router.get("/provider/:providerId", getProviderReviews); // Fetch all reviews for provider

export default router;
