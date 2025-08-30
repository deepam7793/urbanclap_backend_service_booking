import { Request, Response } from "express";
import { offeringService } from "../services/offering.service";

class OfferingController {
  createOffering = async (req: Request, res: Response) => {
    try {
      const newOffering = await offeringService.createOffering(req.body);
      res.status(201).json(newOffering);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllOfferings = async (req: Request, res: Response) => {
    try {
      const offerings = await offeringService.getAllOfferings();
      res.json(offerings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getOfferingById = async (req: Request, res: Response) => {
    try {
      const offering = await offeringService.getOfferingById(Number(req.params.id));
      if (!offering) {
        return res.status(404).json({ message: "Offering not found" });
      }
      res.json(offering);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export const offeringController = new OfferingController();
