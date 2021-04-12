// On importe mongoose pour pouvoir créer le schéma
const mongoose = require("mongoose");

// On crée le schéma de données dont nos objets auront besoin
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    usersLiked: { type: [String] },
    usersDisLiked: { type: [String] },
});

// On exporte le schéma en tant que modèle mongoose appelé Sauce le rendant disponible pour notre application express
module.exports = mongoose.model("Sauce", sauceSchema);
