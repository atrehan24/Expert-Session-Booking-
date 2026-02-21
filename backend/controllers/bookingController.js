import Booking from "../models/Booking.js";

export const createBooking = async (req, res, io) => {
  try {
    const booking = await Booking.create(req.body);

    io.emit("slotBooked", {
      expert: booking.expert,
      date: booking.date,
      timeSlot: booking.timeSlot
    });

    res.status(201).json({ message: "Booking successful" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Slot already booked!" });
    }
    res.status(400).json({ message: "Invalid booking data" });
  }
};

export const getBookingsByEmail = async (req, res) => {
  const bookings = await Booking.find({ email: req.query.email })
    .populate("expert");
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(booking);
};