const mongoose = require("mongoose");

//ajout de ce validateur comme plugin de notre schéma pour eviter les doublons d'email
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//application au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

//export de notre schéma sous forme de modèle
module.exports = mongoose.model("user", userSchema);
