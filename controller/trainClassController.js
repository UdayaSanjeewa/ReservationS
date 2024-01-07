import TrainClass from "../models/trainClassModel.js";
import asyncHandler from 'express-async-handler';

const createTrainClass = asyncHandler(async (req, res) => {
    try {
        const newTrainClass = await TrainClass.create(req.body);
        res.json(newTrainClass);
      } catch (error) {
        throw new Error(error);
      }
})

const updateATrainClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTrainClass = await TrainClass.findByIdAndUpdate(
        id,
        {
          type: req?.body?.type,
          seat: req?.body?.seat,
        },
        {
          new: true,
        }
      );
      res.json(updatedTrainClass);
    } catch (error) {
      throw new Error(error);
    }
})

const getATrainClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const findTrainClass = await TrainClass.findById(id);
      res.json(findTrainClass);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllTrainClasses = asyncHandler(async (req, res) => {
    try {
        const getTrainClasses = await TrainClass.find();
        res.json(getTrainClasses);
      } catch (error) {
        throw new Error(error);
      }
  });

  const deleteATrainClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTrainClass = await TrainClass.findByIdAndDelete(id);
      res.json({
        deletedTrainClass,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

export {createTrainClass, updateATrainClass, getATrainClass, getAllTrainClasses, deleteATrainClass}