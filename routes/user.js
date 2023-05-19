const user = require("../models/user");
const {
  virifyToken,
  virifyTokenAndAuthorization,
  virifyTokenAdmin,
  virifyTokenUser,
} = require("./verifyToken");
const cryptojs = require("crypto-js");
const router = require("express").Router();

//delete user
router.delete("/delete/:id", virifyTokenAndAuthorization, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user hasbeen deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/find", virifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await user.find(query).sort({ _id: -1 }).limit(3)
      : await user.find();

    !users && res.status(403).json("users does't exist");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//find one users
router.get("find/:id", virifyTokenAndAuthorization, async () => {
  try {
    const userData = await user.findOne(req.params.id);
    !userData && res.status(403).json("user does not exist");
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/update/:id", virifyTokenUser, async (req, res) => {
  req.body.password = cryptojs.AES.encrypt(
    req.params.password,
    process.env.pass_enc
  ).toString();
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
