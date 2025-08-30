import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../utils/jwt";

const router = Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser)
router.get("/:id", authMiddleware, userController.getUserById);
router.get("/", authMiddleware, userController.getAllUsers);

export default router;
