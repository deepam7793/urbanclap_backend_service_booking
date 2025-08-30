import { Request, Response } from "express";
import { reviewService } from "../services/review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId; // from authMiddleware
    const { bookingId, rating, comment } = req.body;

    const review = await reviewService.createReview(userId, bookingId, rating, comment);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProviderReviews = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const reviews = await reviewService.getReviewsByProvider(Number(providerId));
    res.json(reviews);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
