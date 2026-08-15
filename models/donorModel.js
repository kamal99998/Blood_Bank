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

    getAll: (filters, callback) => {
        let sql = `
            SELECT
                donors.donor_id,
                donors.user_id,
                users.name,
                users.email,
                users.phone,
                users.address,
                donors.blood_group,
                donors.is_available,
                donors.last_donation_date
            FROM donors
            JOIN users
                ON donors.user_id = users.user_id
            WHERE 1=1
        `;

        const values = [];

        if (filters.blood_group) {
            sql += ` AND donors.blood_group = ?`;
            values.push(filters.blood_group);
        }
        
        if (filters.is_available !== undefined) {
            sql += ` AND donors.is_available = ?`;
            // convert string to boolean equivalent for mysql
            values.push(filters.is_available === 'true' || filters.is_available === true);
        }

        db.query(sql, values, callback);
    },

    findById: (donorId, callback) => {
        const sql = `
            SELECT
                donors.donor_id,
                donors.user_id,
                users.name,
                users.phone,
                users.address,
                donors.blood_group,
                donors.is_available,
                donors.last_donation_date
            FROM donors
            JOIN users
                ON donors.user_id = users.user_id
            WHERE donor_id = ?
        `;

        db.query(sql, [donorId], callback);
    },

    update: (donorId, donor, callback) => {
        const sql = `
            UPDATE donors
            SET blood_group = ?,
                is_available = ?,
                last_donation_date = ?
            WHERE donor_id = ?
        `;

        const values = [
            donor.blood_group,
            donor.is_available,
            donor.last_donation_date,
            donorId
        ];

        db.query(sql, values, callback);
    },

    updateAvailability: (donorId, availability, callback) => {
        const sql = `
            UPDATE donors
            SET is_available = ?
            WHERE donor_id = ?
        `;

        db.query(sql, [availability, donorId], callback);
    },

    delete: (donorId, callback) => {
        const sql = `
            DELETE FROM donors
            WHERE donor_id = ?
        `;

        db.query(sql, [donorId], callback);
    }
};

module.exports = Donor;