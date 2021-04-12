require("dotenv").config();
const express = require("express"); // On importe express
const app = express(); // On crée notre application express nomée app
const mongoose = require("mongoose"); // On importe mongoose
mongoose.set("useCreateIndex", true); // collection.ensureIndex is deprecated. Use createIndexes instead.
const path = require("path"); // Permet d'accéder au chemin de notre système de fichier

const helmet = require("helmet"); // Helmet est une collection de middleware de sécurité

const sauceRoutes = require("./routes/sauce_routes"); // On importe le router
const userRoutes = require("./routes/user_routes"); // On importe notre second router

mongoose
    .connect(
        "mongodb+srv://" +
            process.env.DB_USER +
            ":" +
            process.env.DB_PASS +
            "@" +
            process.env.DB_HOST,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// middleware général pour eviter les pb de CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //1 avec * on peut y accéder depuis partout
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ); //2 ajoute les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); //3 envoi des requête avec les méthodes mentionnées
    next();
});

// Utilisation de la méthode d express permettant de transformer le corps de la requête en JSON utilisable
app.use(express.json());
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes); // On enregistre notre router comme pour une route unique qui commence par /api/sauces
app.use("/api/auth", userRoutes); // On enregistre notre router comme pour une route unique qui commence par /api/auth

// On l'export pour pouvoir l'utiliser depuis nos autres fichiers
module.exports = app;
