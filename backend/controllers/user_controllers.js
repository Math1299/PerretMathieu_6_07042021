const bcrypt = require("bcrypt"); // On récupère bcrypt pour le criptage
const jwt = require("jsonwebtoken"); // Cela permet d'encoder les TOKENS
const User = require("../models/User"); // On récupère notre modèle User

// Pour l'enregistrement de nouveaux utilisateurs
// appel de la fonction hachage de bcrypt dans notre MDP puis salage 10x et renvoie une Promise avec le hash généré
// dans le then création de l'utilisateur et enregistrement  dans la BD
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Pour connecter les utilisateurs existants
// On récupère l'utilisateur de la base qui correspond a email rentré ====>  erreur si pas bon
// On compare le mdp entré avec le hash qui est dans la BD   ====> erreur si pas bon
// Si tout est OK revoie de son userID et token
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            "RRAoJKRJhm4mXYOW",
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
