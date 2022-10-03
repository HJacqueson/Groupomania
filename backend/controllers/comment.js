const Comment = require('../models/Comment');     //utilisation du modèle comment
const auth = require('../middleware/auth');

  
exports.createComment = (req, res, next) => {      //création d'un commentaire
    const userId = req.auth.userId;
    console.log(req.body)
    const commentObject = JSON.parse(req.body.comment);
    const comment = new Comment({...commentObject, userId});
    console.log(req.body.comment)
    comment.save()
    .then(() => res.status(200).json('Commentaire ajouté !'))
    };

exports.getAllComments = (req, res, next) => {     //obtention de l'ensemble des comments
    Comment.findAll({postId: req.params.id})
      .then(comments => res.status(200).json(comments))
};

exports.getOneComment = (req, res, next) => {       //obtention d'un commentaire
  Comment.findOne({_id: req.params.id})
  .then(() => res.status(200).json('Commentaire ajouté !'))
};

exports.deleteComment = (req, res, next) => {       //suppression d'un commentaire
  Comment.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
};