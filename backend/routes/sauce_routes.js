const express = require("express");
// On crée notre router
const router = express.Router();

// On importe notre controller
const sauceCtrl = require("../controllers/sauce_controllers");

router.post("/", sauceCtrl.createSauce); // création d'une nouvelle instance de notre modèle Sauce
// router.post("/:id/like",sauceCtrl.moodSauce );// ajout de like et dislike
router.put("/:id", sauceCtrl.modifySauce); // modification d'une sauce existante
router.delete("/:id", sauceCtrl.deleteSauce); //supprimer une sauce de la BD
router.get("/:id", sauceCtrl.getOneSauce); // lire/trouver une seule sauce dans la BD
router.get("/", sauceCtrl.getAllSauces); // lire/trouver toutes les sauces qui sont dans la BD

// On réexporte le router
module.exports = router;
