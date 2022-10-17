const mongoose = require("mongoose");       //utilisation de la base de données mongoDB

const postSchema = mongoose.Schema({        //schéma post
    userId:{"type": String,required: true},
    firstname:{"type": String,required: true},
    lastname:{"type": String,required: true},
    title: {"type": String, required: true},
    content:{"type": String, required: true},
    imageUrl:{"type": String, default:null},
    likes:{"type": Number, default: 0},
    usersLiked:{"type": [String], index: true},
})

postSchema.set("timestamps", true);      //Ajout de date et heure

module.exports = mongoose.model("Post", postSchema);