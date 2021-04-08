// On importe express
const express = require("express");

// On crée notre application express nomée app
const app = express();

// On importe mongoose
const mongoose = require("mongoose");

// On importe le model Sauce
const Sauce = require("./models/Sauce");

mongoose
    .connect(
        "mongodb+srv://test:1lMlaA4IzSLFE2P7@cluster0.wshny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Notre premier middleware général pour eviter les pb de CORS
// 1 avec * on peut y accéder depuis partout, 2 ajoute les headers mentionnés aux requêtes envoyées vers notre API, 3 envoi des requête avec les méthodes mentionnées
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
// PLUS BESOIN DE BODYPARSER CAR INTREGRE A EXPRESS
app.use(express.json());

// création d'une nouvelle instance de notre modèle Sauce
app.post("/api/sauces", (req, res, next) => {
    delete req.body._id; // il est déjà généré automatiquement par mongoDB
    const sauce = new Sauce({
        ...req.body, // l'opérateur spread permet de faire une copie de tous les éléments de req.body
    });
    sauce
        .save() // cette méthode permet d'enregistrer notre Sauce dans la BD elle renvoie une Promise
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
});

// app.post("/api/sauces/:id/like", (req, res, next) => {});

// modification d'une sauce existante
app.put("/api/sauces/:id", (req, res, next) => {
    Sauce.updateOne(
        { _id: req.params.id }, // premier argument : l'objet de comparaison pour savoir quel objet on modifie
        { ...req.body, _id: req.params.id }
    ) // second argument : la nouvelle versoin de l'objet
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
});

//supprimer une sauce de la BD
app.delete("/api/sauces/:id", (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((error) => res.status(400).json({ error }));
});

// lire/trouver une seule sauce dans la BD
app.get("/api/sauces/:id", (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // cette méthode nous permet de récupérer une sauce grâce à son ID elle retourne une Promise
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
});

// lire/trouver toutes les sauces qui sont dans la BD
app.get("/api/sauces", (req, res, next) => {
    Sauce.find() // cette méthode nous permet de recupérer la liste complète retourne une Promise
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
});

// On l'export pour pouvoir l'utilisée depuis nos autres fichiers
module.exports = app;
