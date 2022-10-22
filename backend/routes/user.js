const express = require("express");     //utilisation d"express
const router = express.Router();        //utilisation du créateur de route
const auth = require("../middleware/auth");     //utilisation du middleware auth
const multer = require("../middleware/multer-config");      //utilisation du middleware multer
const userCtrl = require("../controllers/user");        //utilisation du contrôleur user

router.get("/", auth, userCtrl.getAllUsers);        //étape à valider pour l"obtention de tous les utilisateurs
router.get("/:id", auth, userCtrl.getOneUser);      //étape à valider pour l"obtention d"un utilisateur
router.put("/:id", auth, multer, userCtrl.modifyUser);      //étape à valider pour modifier un utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);       //étape à valider pour supprimer un utilisateur

module.exports = router;