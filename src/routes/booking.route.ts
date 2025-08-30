import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../utils/jwt";

const router = Router();

router.post(
  "/",
  authMiddleware,
  bookingController.create.bind(bookingController)
);
router.get(
  "/:id",
  authMiddleware,
  bookingController.getById.bind(bookingController)
);
router.get(
  "/user/:userId",
  authMiddleware,
  bookingController.getUserBookings.bind(bookingController)
);
router.put(
  "/:id/status",
  authMiddleware,
  bookingController.updateStatus.bind(bookingController)
);

export default router;
