import { Router } from "express";
import { offeringController } from "../controllers/offering.controller";
import { authMiddleware } from "../utils/jwt";

const router = Router();

router.post("/", authMiddleware, offeringController.createOffering);
router.get("/:id", offeringController.getOfferingById);
router.get("/", offeringController.getAllOfferings);

export default router;
