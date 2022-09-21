const express = require('express');     //utilisation d'express
const router = express.Router();        //utilisation du créateur de route
const authCtrl = require('../controllers/auth');        //utilisation du contrôleur utilisateur
// const mailValidator = require('../middleware/mail-validator');     //utilisation du validateur de mail
// const passValidator = require('../middleware/password-validator');      //utilisation du validateur de mot de passe
const limited = require('../middleware/limite-req');        //utilisation du limitateur de requête

router.post('/signup', /*mailValidator, passValidator,*/ limited, authCtrl.signup);        //route d'inscription d'utilisateur
router.post('/login', limited, authCtrl.login);      //route de connexion d'utilisateur

module.exports = router;