const mongodb = require("mongoose");

const artistSchema = new mongodb.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    instagramLink:{
        type:String,
        required:true
    }
})

module.exports = mongodb.model("artist",artistSchema)