const db = require("../config/database");

const User = {

    create: (user, callback) => {
        const sql = `
            INSERT INTO users
            (name, email, password, phone, address, date_of_birth, is_interested)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user.name,
            user.email,
            user.password,
            user.phone,
            user.address,
            user.date_of_birth,
            user.is_interested
        ];

        db.query(sql, values, callback);
    },

    findById: (userId, callback) => {
        const sql = `
            SELECT *
            FROM users
            WHERE user_id = ?
        `;

        db.query(sql, [userId], callback);
    },

    findByEmail: (email, callback) => {
        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
        `;

        db.query(sql, [email], callback);
    },

    update: (userId, user, callback) => {
        const sql = `
            UPDATE users
            SET name = ?,
                phone = ?,
                address = ?,
                date_of_birth = ?
            WHERE user_id = ?
        `;

        const values = [
            user.name,
            user.phone,
            user.address,
            user.date_of_birth,
            userId
        ];

        db.query(sql, values, callback);
    },

    getAll: (callback) => {
        const sql = `
            SELECT *
            FROM users
        `;

        db.query(sql, callback);
    },

    delete: (userId, callback) => {
        const sql = `
            DELETE FROM users
            WHERE user_id = ?
        `;

        db.query(sql, [userId], callback);
    }
};

module.exports = User;