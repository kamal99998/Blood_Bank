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

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch users", error: err.message });
        }
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, users) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch user", error: err.message });
        }
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(users[0]);
    });
};

exports.updateUser = (req, res) => {
    User.update(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to update user", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    });
};

exports.deleteUser = (req, res) => {
    User.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete user", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    });
};