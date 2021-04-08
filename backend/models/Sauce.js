// On importe mongoose pour pouvoir créer le schéma
const mongoose = require("mongoose");

// On crée le schéma de données dont nos objets auront besoin
const sauceSchema = mongoose.Schema({
    // _id: {type: String, require:true}, PAS BESOIN CAR IL EST AUTOMATIQUEMENT CREE PAR MONGOOSE
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    mainPepper: { type: String, require: true },
    usersLiked: { type: [], require: true },
    usersDisLiked: { type: [], require: true },
    userID: { type: String, require: true },
});

// On exporte le schéma en tant que modèle mongoose appelé Sauce le rendant disponible pour notre application express
module.exports = mongoose.model("Sauce", sauceSchema);
