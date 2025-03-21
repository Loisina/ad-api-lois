// these will be the packages I am using
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";



// setting up the Server
const app = express()
app.use(express.json())
app.use(cors())

app.use (userRoutes)


const port = process.env.PORT || 3006
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
});