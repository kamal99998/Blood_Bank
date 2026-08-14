const User = require("../models/userModel");

exports.register = (req, res) => {

    const {
        name,
        email,
        password,
        phone,
        address,
        date_of_birth,
        is_interested
    } = req.body;

    const user = {
        name,
        email,
        password,
        phone,
        address,
        date_of_birth,
        is_interested: is_interested === "true"
    };

    User.create(user, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Registration failed",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Registration successful",
            user_id: result.insertId
        });
    });
};