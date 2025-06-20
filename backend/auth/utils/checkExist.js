const pool = require('../config/dbConfig');

async function checkExist(table, column, value) {
    if (!table || !column || !value) {
        throw new Error('Missing required parameters');
    }

    const query = `SELECT * FROM ?? WHERE ?? = ?`;
    const [rows] = await pool.query(query, [table, column, value]);

    if (rows.length > 0) {
        return true; // Record exists
    } else {
        return false; // Record does not exist
    }
}

module.exports = {
    checkExist
};