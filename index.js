const inquirer = require('inquirer');
const db = require ('./db/connection');
const {getAllDepartments, addDepartment} = require('./sql/departments');
const {getAllRoles} = require('./sql/roles');
const {getAllEmployees} = require('./sql/employees');

const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 
                      'Add An Employee', 'Update An Employee Role']
        })
    .then(({action}) => {
        switch (action) {
            case 'View All Departments':
                getAllDepartments();
                break;
            case 'View All Roles':
                getAllRoles();
                break;
            case 'View All Employees':
                getAllEmployees();
                break;
            case 'Add A Department':
                promtDepartment();
                break;
            case 'Add A Role':
                // Add Role Logic
                break;
            case 'Add An Employee':
                // Add Employee Logic
                break;
            case 'Update An Employee Role':
                // Update Employee Logic
                break;
            default:
                console.log('Invalid Choice');
                break;
        }
    });
};

const promtDepartment = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the department name.',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Department name cannot be null.');
                    return false;
                }
            }
        }
    )
    .then(departmentInput => {
        addDepartment(departmentInput);
        getAllDepartments();
    });
};


promptUser();