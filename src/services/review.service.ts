import Review from "../models/review";
import Booking from "../models/booking";

class ReviewService {
  async createReview(userId: number, bookingId: number, rating: number, comment: string | "") {
    // Ensure booking exists & belongs to this user
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw new Error("Booking not found");

    if (booking.getDataValue("userId") !== userId) {
      throw new Error("You are not authorized to review this booking");
    }

    if (booking.getDataValue("status") !== "completed") {
      throw new Error("You can only review completed bookings");
    }

    const existingReview = await Review.findOne({ where: { bookingId } });
    if (existingReview) throw new Error("Review already exists for this booking");

    const review = await Review.create({ bookingId, userId, rating, comment });
    return review;
  }

  async getReviewsByProvider(providerId: number) {
    return await Review.findAll({
      include: [
        {
          model: Booking,
          where: { providerId },
        },
      ],
    });
  }
}

export const reviewService = new ReviewService();
