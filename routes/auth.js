const user = require("../models/user");
const cryptojs = require("crypto-js");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//USER REGISTRATION
router.post("/register", async (req, res) => {
  const newUser = new user({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.pass_enc
    ).toString()
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    // console.log(savedUser)
  } catch (error) {
    res.status(500).json(error);
  }
});

//USER LOGIN

router.post("/login", async (req, res) => {
  try {
    const User = await user.findOne({ username: req.body.username });
    !User && res.status(403).json("username is inncorect");

    const orignalPassword = cryptojs.AES.decrypt(
      User.password,
      process.env.pass_enc
    ).toString(cryptojs.enc.Utf8);

    orignalPassword !== req.body.password &&
      res.status(403).json("username or password is inncorect");

    const { password, ...others } = User._doc;
    //generate jwt Token
    const accessToken = jwt.sign(
      {
        id: User._id,
        isAdmin: User.isAdmin,
      },
      process.env.jwt_sec,
      { expiresIn: "1d" }
    );

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
