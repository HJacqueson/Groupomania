require ("dotenv").config();
const express = require("express");   //utilisation d"express
const app = express();
const mongoose = require("mongoose");   //utilisation de la base données mongoDB
const postRoutes = require("./routes/post");    //routes des posts
const userRoutes = require("./routes/user");    //routes des utilisateurs
const authRoutes = require("./routes/auth");    //routes d"authentification
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_MDP}@cluster0.kqwhflt.mongodb.net/?retryWrites=true&w=majority`,   //connexion à mongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));    //Verification des en-tête

app.use((req, res, next) => {   //gestion des accès
    res.setHeader("Access-Control-Allow-Origin", "*" /*process.env.FRONT_PORT*/);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, () => console.log("Serveur lancé correctement"))