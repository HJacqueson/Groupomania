const Post = require("../models/Post");     //utilisation du modèle post
const fs = require("fs");       //module de gestion de fichier
const { post } = require("../routes/auth");



exports.createPost = (req, res, next) => {     //création d'un post
  console.log(req.body);
  const userId = req.auth.userId;
  const postObject = JSON.parse(req.body.post);
  console.log(postObject);
  delete postObject._id;
  let image = req.file
  if(image != null ) {
    const post = new Post({
      ...postObject,
      userId,
      imageUrl:`${req.protocol}://${req.get("host")}/images/${image.filename}`
    });
    post.save()
    .then(() => res.status(201).json({message: "Post enregistré !"}))
  }else{
    const post = new Post({
        ...postObject,
    userId});
    post.save()
    .then(() => res.status(201).json({message: "Post enregistré !"}))
  }
};

exports.modifyPost = (req, res, next) => {      //modification d"un Utilisateur
  const userId = req.auth.userId;
  const role = req.auth.role;
  console.log(role)
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : {...JSON.parse(req.body.post)};
  Post.findOne({_id: req.params.id})
    .then(post => { 
      console.log(post);
      if(userId === post.userId || role === "ADMIN"){
        console.log(post)
        console.log(postObject)
        console.log(req.file)
        if(req.file != undefined){
          if(post.imageUrl != null){
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : "Article modifié!"}))
            })
          }else{
            Post.updateOne({ _id: req.params.id}, { ...postObject})
            .then(() => res.status(200).json({message : "Article modifié!"}))
          }  
        }else{
          if(post.imageUrl != null){
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : "Article modifié!"}))
            })
          }else{
            Post.updateOne({ _id: req.params.id}, { ...postObject})
            .then(() => res.status(200).json({message : "Article modifié!"}))
          }            }   
      }else{
        res.status(401).json({message: "Not authorized"});
      }   
    })  
}

exports.getAllPosts = (req, res, next) => {     //obtention de l'ensemble des posts de tous les utilisateurs
    Post.find({order: ["createdAt", "DESC"]})
      .then(posts => res.status(200).json(posts))
};

exports.getOnePost = (req, res, next) => {      //obtention d'un post d'un utilisateur
    Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))
};

exports.deletePost = (req, res, next) => {      //suppression d'un post
  console.log(req.params.id)
  Post.findOne({ _id: req.params.id})
      .then(post => {
        console.log(post)
        const image = post.imageUrl
        Post.deleteOne({_id: req.params.id})
          .then(() => {
            if(image != null){
              const filename = post.imageUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
                console.log("File deleted!")})
            }
          })
          .then(() => { res.status(200).json({message: "Objet supprimé !"})})
      })
};

exports.likePost = (req, res, next) => {        //like dislike d"un post
  console.log(req.params.id)
  Post.findOne({_id: req.params.id})
  .then(async post => {
    console.log(post)
      if (!post){
          res.status(404).json({message: "Le post n\"existe pas"});
      }else{
          const userId = req.auth.userId;
          console.log(userId)
          let alreadyliked = false
          console.log(post.usersLiked)
          if (post.usersLiked.find(element => element === userId)){
            alreadyliked = true
          }
          console.log(alreadyliked)
          let usersLiked = post.usersLiked
          let like = post.likes
          if (alreadyliked === true){
            usersLiked.pull(userId)
            like -= 1
          } else {
            usersLiked.addToSet(userId)
            console.log(usersLiked)
            like += 1
            console.log(like)
          }
          await post.updateOne({
              usersLiked: usersLiked,
              likes: like
          });
          res.status(200).send({message: "Modification like effectué"})
      } 
  })
}