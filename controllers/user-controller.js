import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUserValidator } from "../validators/user-validator.js";
import { UserModel } from "../models/user-model.js";


export const registerUser = async (req, res, next) => {
  const {error, value} = registerUserValidator.validate(req.body);
  if(error) {
    return res.status(422).json(error);
  }

  const user = await UserModel.findOne({
    $or: [
      {userName : value.userName},
      {email : value.email}
    ]
  });
  if (user) {
    return res.status(409).json("User already exists")
  }
  const hashedPassword = bcrypt.hashSync(value.password,10);
  const newUser = await UserModel.create({
    ...value,
    password : hashedPassword
  });
  
}