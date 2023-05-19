const mongodb = require("mongoose")
const songSchema = new mongodb.Schema({
    title:{
        type:String,
        required:true
    },
    userId:{
      type:String,
      required:true
  },
    imgURL:{
        type:String,
        required:true
    },
  songURL: {
    type: String,
    required: true,
  },
  albumId: {
    type: String,
    required: false,
  },
  artistId: {
    type: Array,
    required: true,
  },
})

module.exports = mongodb.model("song",songSchema)