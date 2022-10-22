const mongoose = require("mongoose");     //utilisation de la base de données mongoDB
const uniqueValidator = require("mongoose-unique-validator");     //plugin de validation d'utilisateur unique

const userSchema = mongoose.Schema({    //schéma utilsateur
  firstname : { "type": String, required: true},
  lastname : { "type": String, required: true},
  email: { "type": String, unique: true, required: true },
  password: { "type": String, required: true } ,
  role : {"type": String, default:"SALARIE"},
  profilePicture: {"type": String, default:"http://localhost:4200/images/profile.png"},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

