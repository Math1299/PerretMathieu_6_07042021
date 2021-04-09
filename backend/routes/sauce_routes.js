const express = require("express");
const router = express.Router(); // On crée notre router

const sauceCtrl = require("../controllers/sauce_controllers"); // On importe notre controller
const auth = require("../middleware/auth"); // On importe notre middleware auth
const multer = require("../middleware/multer-config"); // On importe notre middleware multer

router.post("", auth, multer, sauceCtrl.createSauce); // création d'une nouvelle instance de notre modèle Sauce
// router.post("/:id/like",auth, sauceCtrl.moodSauce); // ajout de like et dislike
router.put("/:id", auth, multer, sauceCtrl.modifySauce); // modification d'une sauce existante
router.delete("/:id", auth, sauceCtrl.deleteSauce); //supprimer une sauce de la BD
router.get("/:id", auth, sauceCtrl.getOneSauce); // lire/trouver une seule sauce dans la BD
router.get("", auth, sauceCtrl.getAllSauces); // lire/trouver toutes les sauces qui sont dans la BD

// On réexporte le router
module.exports = router;
