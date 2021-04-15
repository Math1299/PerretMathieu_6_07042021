const passwordSchema = require("../models/Password"); //const model de mot de passe

// Logique de validation
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        console.log("Mot de passe invalide ! Il faut au moins 8 caractères dont 1 majuscule et 2 chiffres les espaces ne sont pas autorisés");
        return res.status(400).json({ error: "Mot de passe pas assez complexe" });
    } else {
        next();
    }
};
