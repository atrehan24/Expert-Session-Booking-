import express from "express";
import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus
} from "../controllers/bookingController.js";

export default (io) => {
  const router = express.Router();

  router.post("/", (req, res) => createBooking(req, res, io));
  router.get("/", getBookingsByEmail);
  router.patch("/:id/status", updateBookingStatus);

  return router;
};