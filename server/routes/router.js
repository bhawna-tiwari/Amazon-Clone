const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const USER = require("../models/userSchema");
// ❌ Removed: const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// GET all products
router.get("/getproducts", async (req, res) => {
  try {
    const productsData = await products.find();
    res.status(200).json(productsData);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET single product by ID
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualProduct = await products.findOne({ id });
    res.status(200).json(individualProduct);
  } catch (error) {
    console.error("Error fetching single product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// REGISTER user
router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all details" });
  }

  try {
    const preuser = await USER.findOne({ email });

    if (preuser) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const finaluser = new USER({ fname, email, mobile, password, cpassword });
      const storedata = await finaluser.save();
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).send(error);
  }
});

// LOGIN user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const user = await USER.findOne({ email });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // ❌ Removed bcrypt.compare — doing plain comparison
    if (password !== user.password)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = await user.generateAuthToken();

    res.cookie("AmazonWeb", token, {
      httpOnly: true,
      sameSite: "Lax",
        secure: true,
      expires: new Date(Date.now() + 900000),
    });

    res.status(201).json({ user });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD to cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cartProduct = await products.findOne({ id });
    const userContact = await USER.findById(req.userID);

    if (userContact) {
      userContact.carts.push(cartProduct);
      await userContact.save();
      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const user = await USER.findById(req.userID);
    res.status(200).json(user);
  } catch (error) {
    console.error("Cart details error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// VALIDATE user
router.get("/validateuser", authenticate, async (req, res) => {
  try {
    const user = await USER.findById(req.userID);
    res.status(200).json(user);
  } catch (error) {
    console.error("Validate user error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// REMOVE item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter(item => item.id !== id);
    await req.rootUser.save();
    res.status(200).json(req.rootUser);
  } catch (error) {
    console.error("Remove item error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGOUT user
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter(tokenObj => tokenObj.token !== req.token);
    res.clearCookie("AmazonWeb", { path: "/" });
    await req.rootUser.save();
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
