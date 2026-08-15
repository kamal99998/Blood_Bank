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