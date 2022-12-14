const User = require("../models/User"); 
const fs = require("fs");       //module de gestion de fichier


exports.modifyUser = (req, res, next) => {      //modification d"un Utilisateur
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        profilePicture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {...req.body};
    delete userObject._userId;
    User.findOne({_id: req.params.id})
        .then(user => {
            console.log(user)
            if (user.id != req.auth.userId) {
                res.status(401).json({ message : "Not authorized"});
            } else {
                console.log(user)
                console.log(req.file)
                if(req.file != undefined && user.profilePicture !="http://localhost:4200/images/profile.png"){
                    const filename = user.profilePicture.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                    User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                        .then(() => res.status(200).json({message : "Utilisateur modifié!"}))
                })
                }else{
                User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : "Utilisateur modifié!"}))
                }
            }
        })
  };

exports.getAllUsers = (req, res, next) => {     //obtention de l"ensemble des utilisateurs
    User.find()
      .then(users => res.status(200).json(users))
};

exports.getOneUser = (req, res, next) => {      //obtention d"un utilisateur
    User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
};

exports.deleteUser = (req, res, next) => {      //suppression d"un utilisateur
    User.findOne({_id: req.params.id})
    .then(user => {
        console.log(user.id)
        console.log(req.auth.userId)
        if (user.id !== req.auth.userId) {
            res.status(401).json({ message : "Not authorized"})
        } else {
            User.findOne({_id: req.params.id})
                .then(user => {
                    User.deleteOne({_id: req.params.id})
                        .then(() => {
                            if (user.profilePicture != "http://localhost:4200/images/profile.png"){
                                const filename = user.profilePicture.split("/images/")[1];
                                fs.unlink(`images/${filename}`, (error) => {
                                    if (error) throw error;
                                    console.log("File deleted!")})
                        }})
                        .then(() => { res.status(200).json({message: "Utilisateur supprimé !"})})                        
                })   
        }
    })
    .catch(error => res.status(500).json({ error }));
    
  };