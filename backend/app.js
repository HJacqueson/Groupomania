require ("dotenv").config();
const express = require("express");   //utilisation d'Express
const app = express();
const mongoose = require("mongoose");   //utilisation de la base données mongoDB
const postRoutes = require("./routes/post");    //routes des posts
const userRoutes = require("./routes/user");    //routes des utilisateurs
const authRoutes = require("./routes/auth");    //routes d'authentification
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_MDP}${process.env.MONGODB_CLUSTER}.mongodb.net/Groupomania`,   //connexion à mongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));    //Vérification des en-tête

app.use((req, res, next) => {   //gestion des accès
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_PORT);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use("/images", express.static(path.join(__dirname, "images")));   //gestion des images

app.use("/api/posts", postRoutes);    //routes des posts
app.use("/api/users", userRoutes);    //routes des utilisateurs
app.use("/api/auth", authRoutes);   //routes d'authentification


app.listen(process.env.PORT, () => console.log("Serveur lancé correctement"))   //écoute du port Front