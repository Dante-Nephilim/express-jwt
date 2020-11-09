import express from "express";
import dotenv from 'dotenv';
import mongoose from "./utils/db";
import private_routes from "./auth/private";

import book_routes from './routes/book_routes';
import user_routes from './routes/user_routes';
dotenv.config();


const MONGO_URI = process.env.MONGO_URI as string;
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);


const app=express();


app.use(express.json());
app.use('/books',book_routes);
app.use('/users',user_routes);
app.use('/private',private_routes);


app.get("/",(req,res)=>{
    console.log("Server is Running");
    res.send("Welcome to the BOOKSHELF");
    
});

const port=3000;
app.listen(port);


