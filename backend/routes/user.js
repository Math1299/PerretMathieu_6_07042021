const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user"); //permet d'associer les fonctions aux différentes routes

//création des deux routes POST car le frontend va aussi envoyer des infos => email et mdp
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
