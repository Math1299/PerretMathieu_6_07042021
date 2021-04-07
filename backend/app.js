// On importe express
const express = require("express");

// On crée notre application express nomée app
const app = express();

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

app.post("/api/sauces", (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: "Sauce créée" });
});

app.use("/api/sauces", (req, res, next) => {
    const sauce = [
        {
            _id: "élkjéjé",
            userId: "dsakféds",
            name: "khh",
            manufacturer: "gfgdg",
            description: "fdfd",
            mainPepper: "kjhlkhj",
            imageUrl: "",
            heat: 2,
            likes: 1,
            dislikes: 1,
            usersLiked: [],
            usersDisliked: [],
        },
    ];
    res.status(200).json(sauce);
});

// On l'export pour pouvoir l'utilisée depuis nos autres fichiers
module.exports = app;
