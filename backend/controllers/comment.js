const Comment = require('../models/Comment');     //utilisation du modèle comment

exports.createComment = (req, res, next) => {      //création d'un commentaire
    const commentObject = JSON.parse(req.body.post);
    const comment = new Comment({...commentObject });
    comment.save()
      .then(Comment.findAll({articleId: req.params.id}))  
      .then(comments => res.status(201).json(comments))
      .catch(error => res.status(500).json({message: error}))
    };

exports.getAllComments = (req, res, next) => {     //obtention de l'ensemble des comments
    Comment.findAll({articleId: req.params.id})
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {       //obtention d'un commentaire
  Comment.findOne({_id: req.params.id})
  .then(() => res.status(200).json('Commentaire ajouté !'))
  .catch(error => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {       //suppression d'un commentaire
  Comment.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};