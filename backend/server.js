import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);

app.listen(3000, () => console.log("Server is listening on port 3000"));
