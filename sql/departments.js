const db = require('../db/connection');

const getAllDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(row);
    });
};

const addDepartment = departmentInput => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;

    db.query(sql, departmentInput.name, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Department successfully added');
    });
};

module.exports = {getAllDepartments, addDepartment};