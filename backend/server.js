import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db.js";
import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes(io));

server.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);