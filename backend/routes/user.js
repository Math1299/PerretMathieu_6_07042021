const express = require("express");
const router = express.Router();

//permet d'associer les fonctions/logiques métier aux différentes routes
const userCtrl = require("../controllers/user");

//importation des middlewares de vérification mdp et email
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");

//création des deux routes POST car le frontend va aussi envoyer des infos => email et mdp
router.post("/signup", passwordValidator, emailValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
