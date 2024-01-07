import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let trainClassSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
const TrainClass = mongoose.model("TrainClass", trainClassSchema);

export default TrainClass;
