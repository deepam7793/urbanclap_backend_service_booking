import { Router } from "express";
import userRoutes from "./user.route";
import proRoutes from "./pro.route";
import offeringRoutes from "./offering.route";
import bookingRoutes from "./booking.route";
import reviewRoutes from "./review.routes"

const router = Router();

router.use("/users", userRoutes);
router.use("/providers", proRoutes);
router.use("/offerings", offeringRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);

export default router;
