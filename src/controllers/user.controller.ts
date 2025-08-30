import { Request, Response } from "express";
import { userService } from "../services/user.service";
class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.status(200).json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUser(req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
export const userController = new UserController();
