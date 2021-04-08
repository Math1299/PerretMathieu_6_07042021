const mongoose = require("mongoose"); // On importe mongoose pour créer notre schema

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // On applique le validator au schema avant d'en faire un modèle

// On exporte le schema sous forme de modèle
module.exports = mongoose.model("User", userSchema);
