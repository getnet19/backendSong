const router = require("express").Router();
const album = require("../models/album");
const {
  virifyTokenUser,
  virifyTokenAndAuthorization,
  virifyToken,
  virifyTokenUserAlbumAuth,
} = require("./verifyToken");

//create album
router.post("/add", async (req, res) => {
  const newAlbum = new album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE ALBUM
router.put("/update/:id", virifyTokenUserAlbumAuth, async (req, res) => {
  try {
    const updatedAlbum = await album.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DLETE ALBUM
router.delete("/delete/:id", virifyTokenUserAlbumAuth, async (req, res) => {
  try {
    await album.findByIdAndDelete(req.params.id);
    res.status(200).json("album is deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL ALBUM
router.get("/find", async (req, res) => {
  const query = req.query.new;

  try {
    const albums = query
      ? await album.find(query).sort({ _id: -1 }).limit(5)
      : await album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ONE ALBUM
router.get("/find/:id", virifyTokenUserAlbumAuth, async (req, res) => {
  try {
    const albumData = await album.findOne(req.params.id);
    res.status(200).json(albumData);
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = router;
