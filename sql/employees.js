const db = require('../db/connection');

const getAllEmployees = () => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
    });
};

const addEmployee = employeeInput => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    if (isNaN(employeeInput.manager_id)) {
        employeeInput.manager_id = null;
    };
    const params = [employeeInput.first_name, employeeInput.last_name, employeeInput.role_id, employeeInput.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Employee successfully added.')
    });
};

const returnEmployee = (callback) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return callback(results);
    })
};

const updateEmployee = (role_id, id) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [role_id, id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Employee successfully updated.')
    });
};

module.exports = {getAllEmployees, addEmployee, returnEmployee, updateEmployee};