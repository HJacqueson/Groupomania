const mongoose = require('mongoose');     //utilisation de la base de données mongoDB
const uniqueValidator = require('mongoose-unique-validator');     //plugin de validation d'utilisateur unique

const userSchema = mongoose.Schema({    //schéma utilsateur
  lastname : { 'type': String, required: true},
  firstname : { 'type': String, required: true},
  email: { 'type': String, unique: true, required: true },
  password: { 'type': String, required: true } ,
  role : {'type': String, default:'SALARIE'},
  bio:{'type': String, required: false},
  profilePicture: {'type': String, default:'./images/profile/profile.png'},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

