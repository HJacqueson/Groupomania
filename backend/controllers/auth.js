const bcrypt = require('bcrypt');       //utilisation de hasheur en ligne
const jwt = require('jsonwebtoken');        //utilisation d'un token

const User = require('../models/User');     //utilisation du modèle utilisateur

exports.signup = (req, res, next) => {      //inscription d'n nouvel utilisateur
    console.log(req.body.email);
    console.log(req.body.password);
    bcrypt.hash(req.body.password, 10)      //cryptage via bcrypt
      .then(hash => {
        const user = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            bio : req.body.bio,
            profilePicture: req.body.profilePicture,
        });
        console.log(user);
        user.save()
          .then(() => res.status(201).json({ message: "Compte créé !" }))
          .catch(error => res.status(400).json({ message: error + "Adrresse mail déja utilisée !" }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {       //connexion d'un utilisateur
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Nom d'utilisateur introuvable" });
            }
            bcrypt.compare(req.body.password, user.password)        //comparaison via bcrypt
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Mot de passe incorrecte" });
                    }
                    res.status(200).json({      //création d'un token d'authentification
                        userId: user._id,
                        role: user.role,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};