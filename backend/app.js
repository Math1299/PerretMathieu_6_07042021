const express = require("express"); // On importe express
const app = express(); // On crée notre application express nomée app
const mongoose = require("mongoose"); // On importe mongoose
const sauceRoutes = require("./routes/sauce_routes"); // On importe le router

mongoose
    .connect(
        "mongodb+srv://test:1lMlaA4IzSLFE2P7@cluster0.wshny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Notre premier middleware général pour eviter les pb de CORS
// 1 avec * on peut y accéder depuis partout,
// 2 ajoute les headers mentionnés aux requêtes envoyées vers notre API,
// 3 envoi des requête avec les méthodes mentionnées

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// Utilisation de la méthode d express permettant de transformer le corps de la requête en JSON utilisable
app.use(express.json());

// On enregistre notre router comme pour une route unique qui commence par /api/sauces
app.use("/api/sauces", sauceRoutes);

// On l'export pour pouvoir l'utiliser depuis nos autres fichiers
module.exports = app;
