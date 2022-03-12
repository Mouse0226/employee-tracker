const db = require('../db/connection');

const getAllEmployees = () => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        }
        console.table(row)
    });

};

module.exports = {getAllEmployees};