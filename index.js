const inquirer = require('inquirer');
const db = require ('./db/connection');
const {getAllDepartments} = require('./sql/departments');
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
                break
            default:
                console.log('Some other action');
                break;
        }
    });
};


promptUser();