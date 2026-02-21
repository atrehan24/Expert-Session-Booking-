import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    required: true
  },
  name: String,
  email: String,
  phone: String,
  date: String,
  timeSlot: String,
  notes: String,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending"
  }
});

// UNIQUE INDEX → prevents race condition double booking
bookingSchema.index(
  { expert: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

export default mongoose.model("Booking", bookingSchema);