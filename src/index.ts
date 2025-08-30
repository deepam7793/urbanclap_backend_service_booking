import app from "./app";
import sequelize from "./config/db";
import "./models/user";
import "./models/provider";
import "./models/offering";
import "./models/booking";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected...👍👍👍👍👍");

    // Sync all models
    await sequelize.sync({ alter: true }); 

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:❌", error);
  }
}

startServer();
