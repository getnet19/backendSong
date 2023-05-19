const mongodb = require("mongoose");

const albumScema = new mongodb.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  imgURL: {
    type: String,
    required: true
  },userId:{
    type:String,
    required:true
  }
});


module.exports = mongodb.model("album", albumScema);
