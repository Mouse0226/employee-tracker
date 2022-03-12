const db = require('../db/connection');

const getAllRoles = () => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        }
        console.table(row)
    });

};

module.exports = {getAllRoles};