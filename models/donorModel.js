const db = require("../config/database");

const Donor = {

    create: (donor, callback) => {
        const sql = `
            INSERT INTO donors
            (user_id, blood_group, is_available, last_donation_date)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            donor.user_id,
            donor.blood_group,
            donor.is_available,
            donor.last_donation_date
        ];

        db.query(sql, values, callback);
    },

    getAllAvailable: (callback) => {
        const sql = `
            SELECT
                donors.donor_id,
                users.name,
                users.phone,
                users.address,
                donors.blood_group,
                donors.is_available
            FROM donors
            JOIN users
                ON donors.user_id = users.user_id
            WHERE donors.is_available = TRUE
        `;

        db.query(sql, callback);
    },

    findById: (donorId, callback) => {
        const sql = `
            SELECT *
            FROM donors
            WHERE donor_id = ?
        `;

        db.query(sql, [donorId], callback);
    },

    updateAvailability: (donorId, availability, callback) => {
        const sql = `
            UPDATE donors
            SET is_available = ?
            WHERE donor_id = ?
        `;

        db.query(sql, [availability, donorId], callback);
    }
};

module.exports = Donor;