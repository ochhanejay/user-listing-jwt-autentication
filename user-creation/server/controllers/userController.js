const bcrypt = require('bcrypt');
const User = require("../models/userModel");


exports.signUp = async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPwd
        });
        newUser.save();
        res.status(200).json({ data: newUser });
    }
    catch (error) {
        console.log(error)

    }
}
exports.updateUser = async (req, res) => {

    try {
        const data = await User.findOneAndUpdate({ _id: req.query.id }, {
            $set: req.body
        });
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error)

    }

};
exports.removeUser = async (req, res, next) => {
    try {
        const data = await User.findOneAndDelete({ _id: req.query.id });

        res.send({ "data": data });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const data = await User.find().sort({ _id: -1 });
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error)

    }
}