import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let trainSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    class: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "TrainClass" 
    }],
    seats: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
const Train = mongoose.model("Train", trainSchema);

export default Train;
