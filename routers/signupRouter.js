const router = require("express").Router();
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorization");

const createUser = async (req, res) => {
    const userDetails = req.body;

    let user = await User.findOne({ email: userDetails.email });
    if (user) return res.send("User already Registered!");

    const genSalt = await bcrypt.genSalt(10);
    userDetails.password = await bcrypt.hash(userDetails.password, genSalt);

    user = new User({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
    });

    try {
        const token = user.generateJwt();
        const result = await user.save();
        // const result = await User.create(userDetails); // alternative
        // const result = await new User(userDetails).save(); // alternative
        res.send({
            token, data: { name: result.name, email: result.email }
        });
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

router.route("/")
    .get()
    .post(createUser)
    .put()
    .delete();

router.route("/:id")
    .get()
    .post()
    .put()
    .delete();

router.route("/me")
    .get(authorize, (req, res) => {
        res.send(req.user);
    });

module.exports = router;