const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connection successful"))
.catch((err) => console.log("❌ MongoDB connection error:", err.message));
