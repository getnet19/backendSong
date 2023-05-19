const router = require("express").Router();
const artist = require("../models/artist");
const { virifyTokenArtistAuth } = require("./verifyToken");

//CREATE ARTIST
router.post("/add", async (req, res) => {
  const newArtist = new artist(req.body);
  try {
    const savedArtist = await newArtist.save();
    res.status(200).json(savedArtist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE ARTIST
router.put("/update/:id", virifyTokenArtistAuth, async (req, res) => {
  try {
    const updatedArtist = await artist.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(403).json(error);
  }
});

//DELETE ARTIST
router.delete("delete/:id",virifyTokenArtistAuth,async(req,res)=>{
    try {
        await artist.findByIdAndDelete(req.params.id);
        res.status(200).json("artist data is deleted");
    } catch (error) {
     res.status(403).json(error);   
    }
})

module.exports = router;
