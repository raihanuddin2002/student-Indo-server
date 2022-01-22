const router = require("express").Router();
const { User } = require('../models/userModel');
const bcrypt = require("bcrypt");

async function login(req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password!!");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid Email or Password!!");

    const token = user.generateJwt();
    res.send({ token });
}
router.route("/")
    .post(login)

module.exports = router;