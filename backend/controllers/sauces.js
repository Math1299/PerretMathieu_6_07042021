const Sauce = require("../models/Sauce"); //import du modèle Sauce
const fs = require("fs"); //permet d'accéder aux opérations liées au système de fichier

//logique métier permettant de créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // on le supprime car il est créé automatiquement par mongoDB
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        // usersLiked: [],
        // usersDisliked: [],
    });
    sauce
        .save() // permet de l'enregistrer dans la BD
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
};

//logique métier permettant de modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file //permet de vérifier si il y a un file déjà existant dans la requête
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
        : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //premier argument : l'objet de comparaison pour savoir quel objet on modifie - second argument : la nouvelle version de l'objet
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};

//logique métier permettant de supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce supprimée" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

//logique métier permettant de récupérer une sauce via son id
exports.getOneThing = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // permet de retrouver une sauce en fonction de son id
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

//logique métier permettant de récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({ error }));
};

//logique métier permettant permettant de like ou dislike une sauce
exports.likeDislikeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //on recupère une sauce via son id
        .then((sauce) => {
            const userId = req.body.userId;
            const like = req.body.like === 1; //on ajoute un like
            const dislike = req.body.like === -1; //on ajoute un dislike
            const changeMood = req.body.like === 0; //on change de choix donc retour à 0
            const authToLike = !sauce.usersLiked.includes(userId); //vérification via userId si on a le droit de like
            const authToDislike = !sauce.usersDisliked.includes(userId); //vérification via userId si on a le droit de dislike
            const alreadyDone = sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId); //vérification si on a déjà donné son avis OU

            //si on veut et que l'on peut like alors push id
            if (like && authToLike) {
                sauce.usersLiked.push(userId);
            } //si on veut et que l'on peut dislike alors push id
            if (dislike && authToDislike) {
                sauce.usersDisliked.push(userId);
            } //si on veut changer de choix
            if (changeMood && alreadyDone) {
                //si déjà like retour en arrière de l'index
                if (sauce.usersLiked.includes(userId)) {
                    let index = sauce.usersLiked.indexOf(userId);
                    sauce.usersLiked.splice(index, 1);
                } else {
                    //si déjà dislike retour en arrière de l'index
                    let index = sauce.usersDisliked.indexOf(userId);
                    sauce.usersDisliked.splice(index, 1);
                }
            }
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;
            const updateSauce = sauce;
            updateSauce.save();
            return updateSauce;
        })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(400).json({ error }));
};
