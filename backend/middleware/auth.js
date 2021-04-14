const jwt = require("jsonwebtoken");

//méthode d'authentification via TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // On se réfère au format du TOKEN
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`); // On décode le token
        const userId = decodedToken.userId; // On extrait Id utilisateur du token
        if (req.body.userId && req.body.userId !== userId) {
            // on compare
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non identifiée" });
    }
};
