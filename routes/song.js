const { virifyTokenSongAuth } = require("./verifyToken");
const song = require("../models/song");
const router = require("express").Router();

//CREATE SONG
router.post("/add", async (req, res) => {
  const newSong = new song(req.body);
  try {
    const savedSong = await newSong.save();
    res.status(500).json(savedSong);
  } catch (err) {
    res.status(403).json(err);
  }
});

//DELETE SONG
router.delete("/delete/:id",virifyTokenSongAuth,async(req,res)=>{
    try {
        await song.findByIdAndDelete(req.params.id);
        res.status(200).json("song has been deleted")
    } catch (error) {
      res.status(403).json(error);  
    }
})

//UPDATE SONG
router.put("/udate/:id",virifyTokenSongAuth,async(req,res)=>{
    try {
        const updatedSong = await song.findByIdAndUpdate(req.params.id);
        res.status(200).json(updatedSong);
    } catch (error) {
     res.status(500).json(error);   
    }
})

//GET ALL SONG
router.get("/find",async(req,res)=>{
    const query = req.query.new;
    try {
        const songs = await song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET one SONG
router.get("/find/:id",virifyTokenSongAuth, async(req,res)=>{
    try {
       const songData = await song.findOne(req.params.id);
       res.status(200).json(songData) 
    } catch (error) {
        res.status(403).json(error);
    }
})

module.exports = router;
