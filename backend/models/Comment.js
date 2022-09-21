const mongoose = require('mongoose');       //utilisation de la base de données mongoDB

const commentSchema = mongoose.Schema({        //schéma comment
    userId:{'type': String,required: true},
    postId : {'type': String, required: true},
    content:{'type': String,required: true},
})

module.exports = mongoose.model('Comment', commentSchema);