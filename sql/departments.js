const db = require('../db/connection');

const getAllDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        }
        console.table(row)
    });

};

module.exports = {getAllDepartments};