const emailSchema = require("validator"); // const validation email

module.exports = (req, res, next) => {
    if (!emailSchema.isEmail(req.body.email)) {
        return res.status(400).json({ error: "Format email : test@test.com" });
    } else {
        next();
    }
};
