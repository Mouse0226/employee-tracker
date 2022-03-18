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

const addRole = roleInput => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [roleInput.title, roleInput.salary, roleInput.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Role successfully added.')
    });
};

const returnRole = (callback) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return callback(results);
    })
};

module.exports = {getAllRoles, addRole, returnRole};