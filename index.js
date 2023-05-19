const userRoute = require("./routes/user");
const albumRoute = require("./routes/album");
const artistRoute = require("./routes/artist");
const songRoute = require("./routes/song");

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");

// data base connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB is connected successfuly");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

// route
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/album", albumRoute);
app.use("/api/artist",artistRoute);
app.use("/api/song",songRoute);

app.listen(5000, () => {
  console.log(`Backend server is running on 5000`);
});
