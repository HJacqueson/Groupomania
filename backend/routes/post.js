const express = require("express");     //utilisation d"express
const router = express.Router();        //utilisation du créateur de route
const auth = require("../middleware/auth");     //utilisation du middleware auth
const multer = require("../middleware/multer-config");      //utilisation du middleware multer
const limited = require("../middleware/limite-req");        //utilisation du middleware de limitation de requête
const postCtrl = require("../controllers/post");        //utilisation du contrôleur post

router.post("/", auth, limited, multer, postCtrl.createPost)     //étape à valider pour la création d"un post
router.get("/", auth, postCtrl.getAllPosts);        //étape à valider pour l'obtention de l'ensemble des posts
router.get("/:id", auth, postCtrl.getOnePost);      //étape à valider pour l'obtention d'un post
router.put("/:id", auth, multer, postCtrl.modifyPost);      //étape à valider pour modifier un post
router.delete("/:id", auth, postCtrl.deletePost);       //étape à valider pour la suppression d'un post
router.post("/:id/like", auth, postCtrl.likePost);      //étape à valider pour les like dislike d'un post

module.exports = router;