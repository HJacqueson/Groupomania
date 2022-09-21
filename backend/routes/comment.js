const express = require('express');     //utilisation d'express
const router = express.Router();        //utilisation du créateur de route
const auth = require('../middleware/auth');     //utilisation du middleware auth

const commentCtrl = require('../controllers/comment');        //utilisation du contrôleur post

router.get('/', auth, commentCtrl.getAllComments);      //route d'obtention de tous les commentaires
router.get('/:id', auth, commentCtrl.getOneComment);        //route d'obtention d'un commentaire
router.post('/', auth, commentCtrl.createComment);      //route de création d'un commentaire
router.delete('/:id', auth, commentCtrl.deleteComment);     //route de suppression d'un commentaire

module.exports = router;
