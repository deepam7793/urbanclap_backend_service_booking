import pro from "../models/provider";

class ProService {
  createPro = async (data: any) => {
    try {
      const newPro = await pro.create(data);
      return newPro;
    } catch (error: any) {
      console.error("Error creating pro:", error.message);
      throw new Error("Failed to create pro");
    }
  };

  getPro = async (id: number) => {
    try {
      const proData = await pro.findOne({
        where: { id },
      });
      return proData;
    } catch (error: any) {
      console.error("Error fetching pro:", error.message);
      throw new Error("Failed to fetch pro");
    }
  };

  getAllPros = async () => {
    try {
      const pros = await pro.findAll();
      return pros;
    } catch (error: any) {
      console.error("Error fetching pros:", error.message);
      throw new Error("Failed to fetch pros");
    }
  };
}

export const proService = new ProService();
