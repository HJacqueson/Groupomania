const User = require('../models/User'); 
const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.modifyUser = (req, res, next) => {      //modification d'un Utilisateur
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        profilePicture: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
    } : { ...req.body };
  
    delete userObject._userId;
    User.findOne({_id: req.params.id})
        .then(user => {
            if (user.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Utilisateur modifié!'}))
            }
        })
  };

exports.getAllUsers = (req, res, next) => {     //obtention de l'ensemble des utilisateurs
    User.find()
      .then(users => res.status(200).json(users))
};

exports.getOneUser = (req, res, next) => {      //obtention d'un utilisateur
    User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
};

exports.getUserByName = (req, res, next) => {      //obtention d'un utilisateur par son nom
    User.findOne({ name: req.params.name })
      .then(user => res.status(200).json(user))
};

exports.deleteUser = (req, res, next) => {      //suppression d'un utilisateur
    User.findOne({_id: req.params.id})
    if (user.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized'})
    } else {
      Comment.deleteAll({userId: req.params.id})
      .then(() => Post.findAll({userId: req.params.id})
        .then((posts) => {
                posts.forEach(
                    (post) => {
                    Comment.deleteAll({postId: post.id})
                    Post.delete({id: post.id})
                    })})
        .then(() =>
          User.findOne({id: req.params.id})
              .then(user => {
                const filename = user.profilePicture.split('/images/profile/')[1];
                fs.unlink(`images/profile/${filename}`, () => {
                User.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Utilisateur supprimé !'})}
                    )}
                    )
                }
               )
        )
       )
    }
  };