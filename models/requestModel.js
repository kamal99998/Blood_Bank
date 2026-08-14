const db = require("../config/database");

const BloodRequest = {

    create: (request, callback) => {
        const sql = `
            INSERT INTO blood_requests
            (
                requester_id,
                donor_id,
                blood_group,
                hospital_name,
                hospital_address,
                required_date,
                units_required,
                reason
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            request.requester_id,
            request.donor_id,
            request.blood_group,
            request.hospital_name,
            request.hospital_address,
            request.required_date,
            request.units_required,
            request.reason
        ];

        db.query(sql, values, callback);
    },

    getByDonor: (donorId, callback) => {
        const sql = `
            SELECT *
            FROM blood_requests
            WHERE donor_id = ?
            ORDER BY created_at DESC
        `;

        db.query(sql, [donorId], callback);
    },

    updateStatus: (requestId, status, callback) => {
        const sql = `
            UPDATE blood_requests
            SET status = ?
            WHERE request_id = ?
        `;

        db.query(sql, [status, requestId], callback);
    }
};

module.exports = BloodRequest;