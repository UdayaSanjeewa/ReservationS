import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    reservedTrain: {
      train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train",
        required: true,
      },
      trainClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainClass",
        required: true,
      },
      seat: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

//Export the model
const Reservation = mongoose.model("Reservation", ReservationSchema);

export default Reservation;
