//On importe mongoose pour pouvoir créer notre schéma
const mongoose = require("mongoose");

//On crée le schéma de données dont nos objets auront besoin
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

//On exporte le schéma en tant que modèle mongoose appelé sauce le rendant disponible pour notre application express
module.exports = mongoose.model("sauce", sauceSchema); //(premier argu:nom du modèle, second argu:schéma créé)
