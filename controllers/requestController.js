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

exports.getAllRequests = (req, res) => {
    BloodRequest.getAll((err, requests) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        res.status(200).json(requests);
    });
};

exports.getRequestById = (req, res) => {
    BloodRequest.findById(req.params.id, (err, requests) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        if (requests.length === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json(requests[0]);
    });
};

exports.getRequestsByDonor = (req, res) => {
    BloodRequest.getByDonor(req.params.donorId, (err, requests) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        res.status(200).json(requests);
    });
};

exports.getRequestsByRequester = (req, res) => {
    BloodRequest.getByRequester(req.params.requesterId, (err, requests) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        res.status(200).json(requests);
    });
};

exports.updateRequest = (req, res) => {
    BloodRequest.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Updated successfully" });
    });
};

exports.updateRequestStatus = (req, res) => {
    BloodRequest.updateStatus(req.params.id, req.body.status, (err, result) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Status updated successfully" });
    });
};

exports.deleteRequest = (req, res) => {
    BloodRequest.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: "Failed", error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    });
};