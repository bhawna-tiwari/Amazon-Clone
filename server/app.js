require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products=require("./models/productsSchema");
const DefaultData =require("./defaultdata");
const cors =require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
const allowedOrigins = [
  "http://localhost:3000",
  "https://amazon-clone-one-gamma.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(router);

const PORT = process.env.PORT || 8006;

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT,()=>{
    console.log(`server is running on port number ${PORT}`);
});

DefaultData();