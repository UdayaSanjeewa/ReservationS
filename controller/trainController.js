import Train from "../models/trainModel.js";
import asyncHandler from "express-async-handler";

const createTrain = asyncHandler(async (req, res) => {
  // console.log(req.body);
  try {
    const newTrain = await Train.create(req.body);
    res.json(newTrain);
  } catch (error) {
    throw new Error(error);
  }
});

const updateATrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("id", id);
  // console.log("data", req.body);
  try {
    const updatedTrain = await Train.findByIdAndUpdate(
      id,
      {
        number: req?.body?.number,
        name: req?.body?.name,
        from: req?.body?.from,
        to: req?.body?.to,
        class: req?.body?.class,
        seats: req?.body?.seats,
      },
      {
        new: true,
      }
    );
    res.json(updatedTrain);
  } catch (error) {
    throw new Error(error);
  }
});

const getATrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findTrain = await Train.findById(id);
    res.json(findTrain);
  } catch (error) {
    throw new Error(error);
  }
});

// get all trains
// http://localhost:5000/api/v1/train?page=1&limit=2
const getAllTrains = asyncHandler(async (req, res) => {
  try {
    // all trains at once
    // const getTrains = await Train.find();
    // res.json(getTrains);

    // paginated train list
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    let query = Train.find().skip(skip).limit(limit);

    if (req.query.page) {
      const trainCount = await Train.countDocuments();
      if (skip >= trainCount) throw new Error("This Page does not exists");
    }

    const getTrains = await Train.find(query);
    res.json(getTrains);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTrainsList = asyncHandler(async (req, res) => {
  try {
    const getTrains = await Train.find();
    res.json(getTrains);
  } catch (error) {
    throw new Error(error);
  }
});

// Method 01
// get trains with filtering
// http://localhost:5000/api/v1/train?name=Fastline
//   const getAllTrains = asyncHandler(async (req, res) => {
//     console.log(req.query);
//   try {
//       const getTrains = await Train.find(req.query);
//       res.json(getTrains);
//     } catch (error) {
//       throw new Error(error);
//     }
// });

// Method 02
// get trains with filtering
// http://localhost:5000/api/v1/train?name=Speed&seat=120
//   const getAllTrains = asyncHandler(async (req, res) => {
//     console.log(req.query);
//   try {
//       const getTrains = await Train.find({
//         name: req.query.name,
//         seat: req.query.seat
//       });
//       res.json(getTrains);
//     } catch (error) {
//       throw new Error(error);
//     }
// });

// http://localhost:5000/api/v1/train?from=Colombo
// http://localhost:5000/api/v1/train?from=Colombo&to=Kandy
// Filter Trains
const searchTrains = asyncHandler(async (req, res) => {
  try {
    const trains = await Train.find(req.query);
    res.json(trains);
  } catch (error) {
    throw new Error(error);
  }
});

// Method 03
// get trains with filtering
// http://localhost:5000/api/v1/train?name=Speed
//   const getAllTrains = asyncHandler(async (req, res) => {
//     // console.log(req.query);
//   try {
//       const getTrains = await Train.where("name").equals(req.query.name);
//       res.json(getTrains);
//     } catch (error) {
//       throw new Error(error);
//     }
// });

const deleteATrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrain = await Train.findByIdAndDelete(id);
    res.json({
      deletedTrain,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createTrain,
  updateATrain,
  getATrain,
  getAllTrains,
  getAllTrainsList,
  deleteATrain,
  searchTrains,
};
