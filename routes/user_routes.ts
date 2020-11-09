import express from "express";
import USERS from "../schemas/user_schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user_auth_schema from "../auth/user_auth";
import dotenv from 'dotenv';

import login_auth_schema from "../auth/login_valid";
dotenv.config();

const u_router = express.Router();

u_router.get("/", async (req, res) => {
  console.log("Welcome to the USERS section");
  const ALL_USERS = await USERS.find();
  res.json(ALL_USERS);
});
u_router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user_byid = await USERS.findById(id);
  res.json(user_byid);
});
u_router.post("/", async (req, res) => {
  const { error } = user_auth_schema.validate(req.body);
  if (error) return res.status(400).send(error?.details[0].message);

  const email_exists = await USERS.findOne({ EMAIL: req.body.EMAIL});
  if(email_exists) return res.status(400).send('Email already exists')

  // const salt= await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.PASSWORD, 8);


  

  const new_user = USERS.create({
USER_NAME: req.body.USER_NAME,
      AGE: req.body.AGE,
      FULL_NAME: req.body.FULL_NAME,
      LOCATION: req.body.LOCATION,
     CONTACT_NUMBER: req.body.CONTACT_NUMBER,
      PASSWORD:hashed_password,
      EMAIL:req.body.EMAIL


  });
  res.json(new_user);
});
u_router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const update_user = await USERS.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(update_user);
});
u_router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const delete_user = await USERS.findByIdAndDelete(id);
  res.json(delete_user);
});


u_router.post("/login", async (req, res) => {
  const { error } = login_auth_schema.validate(req.body);
  if (error) return res.status(400).send(error?.details[0].message);

  const user_log = await USERS.findOne({ EMAIL: req.body.EMAIL});
  if(!user_log) return res.status(400).send('Email not registered');

  const valid_password= await bcrypt.compare(req.body.PASSWORD,user_log.toJSON().PASSWORD);
 if(!valid_password) return res.status(400).send('Password Incorrect');

const token = jwt.sign({_id:user_log.toJSON()._id},process.env.token_key as string,{ expiresIn: 600 });
res.header('gen_token',token).send(token);
//  res.send('Logged IN');
})

export default u_router;
