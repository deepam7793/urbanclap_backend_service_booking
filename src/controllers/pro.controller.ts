import { Request, Response } from "express";
import { proService } from "../services/pro.service";

class ProController {
  createPro = async (req: Request, res: Response) => {
    try {
      const newPro = await proService.createPro(req.body);
      res.status(201).json(newPro);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getProById = async (req: Request, res: Response) => {
    try {
      const proData = await proService.getPro(Number(req.params.id));
      if (!proData) {
        return res.status(404).json({ error: "Pro not found" });
      }
      res.status(200).json(proData);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getAllPros = async (_req: Request, res: Response) => {
    try {
      const pros = await proService.getAllPros();
      res.status(200).json(pros);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

export const proController = new ProController();
