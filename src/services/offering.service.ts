import Offering from "../models/offering";

class OfferingService {
  createOffering = async (data: any) => {
    try {
      return await Offering.create(data);
    } catch (error: any) {
      console.error("Error creating offering:", error.message);
      throw new Error("Failed to create offering");
    }
  };

  getAllOfferings = async () => {
    try {
      return await Offering.findAll();
    } catch (error: any) {
      console.error("Error fetching offerings:", error.message);
      throw new Error("Failed to fetch offerings");
    }
  };

  getOfferingById = async (id: number) => {
    try {
      return await Offering.findOne({ where: { id } });
    } catch (error: any) {
      console.error("Error fetching offering:", error.message);
      throw new Error("Failed to fetch offering");
    }
  };
}

export const offeringService = new OfferingService();
