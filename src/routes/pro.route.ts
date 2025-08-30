import { Router } from "express";
import { proController } from "../controllers/pro.controller";
import { authMiddleware } from "../utils/jwt";

const router = Router();

router.post("/", authMiddleware, proController.createPro);
router.get("/:id", proController.getProById);
router.get("/", proController.getAllPros);

export default router;
