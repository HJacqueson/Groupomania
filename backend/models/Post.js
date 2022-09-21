const mongoose = require('mongoose');       //utilisation de la base de données mongoDB

const postSchema = mongoose.Schema({        //schéma post
    userId:{'type': String,required: true},
    username : {'type': String, required: true},
    content:{'type': String,required: true},
    imageUrl:{'type': String,required: true},
    likes:{'type': Number, default: 0},
    dislikes:{'type': Number, default: 0},
    usersLiked:{'type': [String], index: true},
    usersDisliked:{'type': [String], index: true}
})

module.exports = mongoose.model('Post', postSchema);