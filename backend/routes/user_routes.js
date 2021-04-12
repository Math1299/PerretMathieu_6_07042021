// Création de notre router avec express
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user_controllers");
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");

const rateLimit = require("express-rate-limit"); // Permet de limiter les demandes d'accés répétées à l'API

const limiter = rateLimit({
    windowMS: 5 * 60 * 1000, // 5 minutes
    max: 5, // chaque IP est limitée à 5 requêtes par windowMs
});

// création des deux routes POST car le frontend va aussi envoyer des infos => email et mdp
router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;
