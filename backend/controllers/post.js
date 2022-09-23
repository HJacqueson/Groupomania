const Post = require('../models/Post');     //utilisation du modèle post
const fs = require('fs');       //module de gestion de fichier

exports.createPost = (req, res, next) => {      //création d'un post
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  let image = req.file.filename
  if(image != null ) {
    const post = new Post({
      ...postObject,
      imageUrl:`${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
    });
    post.save()
    .then(() => res.status(201).json({message: 'Post enregistré !'}))
  }else{
    const post = new Post({
        ...postObject });
    post.save()
    .then(() => res.status(201).json({message: 'Post enregistré !'}))
  }
};

exports.getAllPosts = (req, res, next) => {     //obtention de l'ensemble des posts de tous les utilisateurs
    Post.findAll({order: ['createdAt', 'DESC']})
      .then(posts => res.status(200).json(posts))
};

exports.getOnePost = (req, res, next) => {      //obtention d'un post d'un utilisateur
    Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))
};

exports.getPostsByUserId = (req, res, next) => {        //obtention de tous les posts d'un utilisateur
    Post.findAll({where: {userId: req.params.id}, order: ['createdAt', 'DESC']})
    .then(posts => {res.status(200).json({data: posts});})
};

exports.modifyPost = (req, res, next) => {      //modification d'un post
  let image = req.file.filename
  if(image != null ) {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
    } : { ...req.body };
    delete postObject._userId;
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
            }
        })
   } else {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post)} : { ...req.body };
    delete postObject._userId;
    Post.findOne({_id: req.params.id})
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
            }
        })
  }
};

exports.deletePost = (req, res, next) => {      //suppression d'un post
  Post.findOne({ _id: req.params.id})
      .then(post => {
          if (post.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const image = req.file.filename
              if (image != null) {
                const filename = post.imageUrl.split('/images/post/')[1];
                fs.unlink(`images/post/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                });
              } else {
                Post.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
              }
          }
      })
};

exports.likePost = (req, res, next) => {        //like dislike d'un post
  Post.findOne({_id: req.params.id})
  .then(async post => {
      if (!post){
          res.status(404).json({message: 'Le post n\'existe pas'});
      }else{
          const userId = req.body.userId;
          const like = req.body.like;
          let usersLiked = post.usersLiked;
          let usersDisliked = post.usersDisliked;
          switch (like) {
              case 1:
                  usersLiked.addToSet(userId);
                  break;
              case 0:
                  usersLiked = usersLiked.filter(element => element !== userId);
                  usersDisliked = usersDisliked.filter(element => element !== userId);
                  break;
              case -1:
                  usersDisliked.addToSet(userId);
                  break;
              default:
                  res.status(402).send({message: 'Valeur inconnue'})
                  break;
          }
          let likes = usersLiked.length;
          let dislikes = usersDisliked.length;
          await post.updateOne({
              usersLiked: usersLiked,
              usersDisliked: usersDisliked,
              likes: likes,
              dislikes: dislikes
          });
          res.status(200).send({message: 'Modification like effectué'})
      } 
  })
}