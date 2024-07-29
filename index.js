import express from "express";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./src/models/index.js";
import userRoutes from "./src/routes/user.js";
import flightRoutes from "./src/routes/flight.js";
import adminRoutes from "./src/routes/admin.js";
import authRoutes from "./src/routes/auth.js";
import startCronJobs from "./src/config/cronjob.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/flight", flightRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      startCronJobs.start();
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
