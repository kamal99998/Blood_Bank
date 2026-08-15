const Donor = require("../models/donorModel");
const BloodRequest = require("../models/requestModel");

exports.createRequest = (req, res) => {

    const {
        requester_id,
        donor_id,
        blood_group,
        hospital_name,
        hospital_address,
        required_date,
        units_required,
        reason
    } = req.body;

    Donor.findById(donor_id, (err, donors) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (donors.length === 0) {
            return res.status(404).json({
                message: "Donor not found"
            });
        }

        const donor = donors[0];

        // Important: donor must be available
        if (!donor.is_available) {
            return res.status(400).json({
                message: "This donor is currently unavailable"
            });
        }

        const request = {
            requester_id,
            donor_id,
            blood_group,
            hospital_name,
            hospital_address,
            required_date,
            units_required,
            reason
        };

        BloodRequest.create(request, (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Request failed"
                });
            }

            res.status(201).json({
                message: "Blood request sent successfully",
                request_id: result.insertId
            });
        });
    });
};