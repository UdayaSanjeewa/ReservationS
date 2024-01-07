import asyncHandler from "express-async-handler";
import Customer from '../models/customerModel.js';
import { generateToken } from "../config/jwtToken.js";
import generateRefreshToken from "../config/refreshToken.js";
import Reservation from "../models/reservationModel.js";
import TrainClass from "../models/trainClassModel.js";

const registerCustomer = asyncHandler(async (req, res) => {
  // console.log(req.body);
    const {name, email, mobile, password} = req.body;

    const findCustomer = await Customer.findOne({ email: email });
    if (!findCustomer) {
      // Create new user
      const newCustomer = await Customer.create(req.body);
      res.json(newCustomer);
    } else {
      // User already exists
      throw new Error("User Already Exists");
    }
});

const loginCustomer = asyncHandler (async(req, res) => {
  // console.log(req.body);
    const { email, password } = req.body;

  // check is user extixts or not
  const findCustomer = await Customer.findOne({ email });
  if (findCustomer && (await findCustomer.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findCustomer?._id);
    const updateCustomer = await Customer.findByIdAndUpdate(
      findCustomer.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    // console.log(findCustomer);
    res.json({
      _id: findCustomer?._id,
      name: findCustomer?.name,
      mobile: findCustomer?.mobile,
      token: generateToken(findCustomer?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const logoutCustomer = (req, res) => {
//   res.status(200).json({ message: "logout Customer" });
res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getAllCustomerProfiles = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: "Get All Customer Profiles" });
    try {
      const getCustomers = await Customer.find();
      res.json(getCustomers);
    } catch (error) {
      throw new Error(error);
    }
  });

const getCustomerProfile = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "Get Customer Profile" });
  const customer = await Customer.findById(req.customer._id);
  
  if (customer) {
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  } else {
    res.status(404).json('User not found');
    // throw new Error('User not found');
  }
});

const updateCustomerProfile = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "Update Customer Profile" });
  const customer = await Customer.findById(req.customer._id);
  // console.log(customer);
  
  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.mobile = req.body.mobile || customer.mobile;

    if (req.body.password) {
      customer.password = req.body.password;
    }

    const updatedCustomer = await customer.save();

    res.json({
      _id: updatedCustomer._id,
      name: updatedCustomer.name,
      email: updatedCustomer.email,
    });
  } else {
    res.status(404).json('User not found');
    // throw new Error('User not found');
  }
});

// Reservations
// reserve a train
const reserveATrain = asyncHandler(async (req, res) => {
  const { ticketInfo, reservedTrain } = req.body;
  
  const customer = req.customer;
  const reservedClass = await TrainClass.findOne({
    _id: reservedTrain.trainClass,
  });
  const totalPrice = reservedClass.price * reservedTrain.seat;
  reservedTrain.price = totalPrice;

  try {
    const reservationData = await Reservation.create({
      user: customer?._id,
      ticketInfo,
      reservedTrain,
    });

    // send email

    // const data = {
    //   to: email,
    //   text: "Your Ticket Details",
    //   subject: "Ticket Details",
    //   html: `<h1>User : ${name}</h1><h2>Address : ${ticketInfo.address}</h2><h2>Seats : ${reservedTrain.seat}</h2><h1>Price : ${totalPrice}<h1/>`,
    // };
    // sendEmail(data);

    // -----------------

    res.json({
      reservationData,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  loginCustomer,
  registerCustomer,
  logoutCustomer,
  getAllCustomerProfiles,
  getCustomerProfile,
  updateCustomerProfile,
  reserveATrain
};
