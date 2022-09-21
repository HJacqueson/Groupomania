const passwordValidator = require ('password-validator');

let passwordSchema = new passwordValidator();       //schéma de validation du mot de passe

passwordSchema
.is().min(8, 'Le mot de passe doit contenir minimum 8 caractères')  
.is().max(100, 'Le mot de passe doit contenir maximum 100 caractères')       
.has().uppercase(1, 'Le mot de passe doit contenir minimum 1 lettre majuscule')
.has().lowercase(1, 'Le mot de passe doit contenir minimum 1 lettre minuscule')
.has().digits(2, 'Le mot de passe doit contenir au moins 2 chiffres')
.has().not().spaces(0,'Le mot de passe ne doit pas contenir d\'espace')
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordSchema;