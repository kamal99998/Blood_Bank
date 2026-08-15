const User = require("../models/userModel");
const Donor = require("../models/donorModel");

exports.registerDonor = (req, res) => {

    const {
        user_id,
        blood_group,
        last_donation_date
    } = req.body;

    // First check the user
    User.findById(user_id, (err, users) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = users[0];

        // User must be interested
        if (!user.is_interested) {
            return res.status(403).json({
                message: "You are not interested in donating blood"
            });
        }

        const donor = {
            user_id,
            blood_group,
            is_available: true,
            last_donation_date
        };

        Donor.create(donor, (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Donor registration failed"
                });
            }

            res.status(201).json({
                message: "Donor registration successful"
            });
        });
    });
};

exports.getAllDonors = (req, res) => {
    const filters = {
        blood_group: req.query.blood_group,
        is_available: req.query.is_available
    };

    Donor.getAll(filters, (err, donors) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch donors", error: err.message });
        }
        res.status(200).json(donors);
    });
};

exports.getDonorById = (req, res) => {
    Donor.findById(req.params.id, (err, donors) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch donor", error: err.message });
        }
        if (donors.length === 0) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.status(200).json(donors[0]);
    });
};

exports.updateDonor = (req, res) => {
    Donor.update(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to update donor", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.status(200).json({ message: "Donor updated successfully" });
    });
};

exports.deleteDonor = (req, res) => {
    Donor.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete donor", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.status(200).json({ message: "Donor deleted successfully" });
    });
};