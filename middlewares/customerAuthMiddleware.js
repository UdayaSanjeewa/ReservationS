import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Customer from '../models/customerModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customer.findById(decoded?.id);
        req.customer = customer;
        next();
      }
    } catch (error) {
      throw new Error("Not autherized, token expired. Please login again");
    }
  } else {
    throw new Error("There is no token attach to the hearder");
  }
});

export { protect };