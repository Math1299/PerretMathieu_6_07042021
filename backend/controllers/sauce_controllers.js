// On importe le model Sauce
const Sauce = require("../models/Sauce");

exports.createSauce = (req, res, next) => {
    delete req.body._id; // il est déjà généré automatiquement par mongoDB
    const sauce = new Sauce({
        ...req.body, // l'opérateur spread permet de faire une copie de tous les éléments de req.body
    });
    sauce
        .save() // cette méthode permet d'enregistrer notre Sauce dans la BD elle renvoie une Promise
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
};

// COMPORTEMENT A ANALYSER CORRECTEMENT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.moodSauce = (req, res, next) => {
//     Sauce.updateOne(
//         { _id: req.params.id }, // premier argument : l'objet de comparaison pour savoir quel objet on modifie
//         { ...req.body, _id: req.params.id }
//     ) // second argument : la nouvelle versoin de l'objet
//         .then(() => res.status(200).json({ message: "Sauce modifiée" }))
//         .catch((error) => res.status(400).json({ error }));
// };

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne(
        { _id: req.params.id }, // premier argument : l'objet de comparaison pour savoir quel objet on modifie
        { ...req.body, _id: req.params.id }
    ) // second argument : la nouvelle versoin de l'objet
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // cette méthode nous permet de récupérer une sauce grâce à son ID elle retourne une Promise
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // cette méthode nous permet de recupérer la liste complète retourne une Promise
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};
