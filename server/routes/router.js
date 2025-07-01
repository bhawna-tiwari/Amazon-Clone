const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcrypt");
const authenicate = require("../middleware/authenticate");

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await products.find();
    // console.log(producstdata + "data mila hain");
    res.status(200).json(producstdata);
  } catch (error) {
    console.log("error " + error.message);  
  res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);

    const individual = await products.findOne({ id: id });
    //console.log(individual + "individual data mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(individual);
    console.log("error" + erroir.message);
  }
});

// register the data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
    console.log("not data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(
      "error the bhai catch ma for registratoin time" + error.message
    );
    res.status(422).send(error);
  }
});

//login user api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Fill in all the details" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });

    if (userlogin) {
      // Compare plain text password
      if (password === userlogin.password) {
        console.log("✅ Password matched successfully for:", email);
        // Token generate (if you're using JWT or similar)
        const token = await userlogin.generatAuthtoken();

        res.cookie("AmazonWeb", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
          sameSite: "Lax",     // or "None" if cross-origin
          secure: false        // false for localhost, true for HTTPS
        });

        return res.status(201).json({ userlogin});
      } else {
        return res.status(400).json({ error: "Invalid password" });
      }
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});


//adding the data into cart

router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await products.findOne({ id: id });
    console.log(cart + "cart value");

    const Usercontact = await USER.findOne({ _id:req.userID });
    console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);
      await Usercontact.save();
      console.log(cartData + " thoda sa wait kr");
      //console.log(Usercontact + "userjode save");
      res.status(201).json(Usercontact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }


  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});


//get cart details
router.get("/cartdetails", authenicate, async (req, res) => {
  try {
      const buyuser = await USER.findOne({ _id: req.userID });
      // console.log(buyuser + "user available");
      res.status(201).json(buyuser);
  } catch (error) {
      console.log(error + "error");
  }
});

// get user is login or not
router.get("/validateuser", authenicate, async (req, res) => {
  try {
      const validateuser= await USER.findOne({ _id: req.userID });
      res.status(201).json(validateuser);
  } catch (error) {
      console.log(error + "error for valid user");
  }
});


router.delete("/remove/:id", authenicate, async (req, res) => {
  try {
      const { id } = req.params;

      req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
          return cruval.id != id;
      });

      req.rootUser.save();
      res.status(201).json(req.rootUser);
      console.log("iteam remove");

  } catch (error) {
      console.log("error" + error);
      res.status(400).json(req.rootUser);
  }
});

//for user logout
router.get("/logout", authenicate, async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      res.clearCookie("Amazonweb", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});

module.exports = router;
