const Sauce = require("../models/Sauce"); // On importe le model Sauce
const fs = require("fs"); // Permet d'accéder aux opérations liées au système de fichier

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // il est déjà généré automatiquement par mongoDB
    const sauce = new Sauce({
        ...sauceObject, // l'opérateur spread permet de faire une copie de tous les éléments de sauceObject
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    sauce
        .save() // cette méthode permet d'enregistrer notre Sauce dans la BD elle renvoie une Promise
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find() // cette méthode nous permet de recupérer la liste complète retourne une Promise
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // cette méthode nous permet de récupérer une sauce grâce à son ID elle retourne une Promise
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id }, // premier argument : l'objet de comparaison pour savoir quel objet on modifie
        { ...sauceObject, _id: req.params.id } // second argument : la nouvelle version de l'objet
    )
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: "Sauce supprimée" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
