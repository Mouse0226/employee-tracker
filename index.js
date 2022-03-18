const inquirer = require('inquirer');
const {getAllDepartments, addDepartment} = require('./sql/departments');
const {getAllRoles, addRole, returnRole} = require('./sql/roles');
const {getAllEmployees, addEmployee, returnEmployee, updateEmployee} = require('./sql/employees');

const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 
                      'Add An Employee', 'Update An Employee Role', 'Exit']
        })
    .then(({action}) => {
        switch (action) {
            case 'View All Departments':
                getAllDepartments();
                return delay(1000).then(function() {
                    return promptUser();
                });
            case 'View All Roles':
                getAllRoles();
                return delay(1000).then(function() {
                    return promptUser();
                });
            case 'View All Employees':
                getAllEmployees();
                return delay(1000).then(function() {
                    return promptUser();
                });
            case 'Add A Department':
                promtDepartment();
                break;
            case 'Add A Role':
                promptRole();
                break;
            case 'Add An Employee':
                promptEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeStart();
                break;
            case 'Exit':
                process.exit();
        }
    })
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
        return delay(1000).then(function() {
            return promptUser();
        });
    });
};

const promptRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the role title.'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the role salary.',
            default: 0.00
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter the department id associated with this role.'
        }
    ])
    .then(roleInput => {
        addRole(roleInput);
        return delay(1000).then(function() {
            return promptUser();
        });
    });
};

const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the employee's first name."
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the employee's last name."
        },
        {
            type: 'number',
            name: 'role_id',
            message: "Please enter the ID associated with this employee's role."
        },
        {
            type: 'number',
            name: 'manager_id',
            message: "Please enter the ID of this employee's manager, or leave blank if not applicable.",
            default: null
        }
    ])
    .then(employeeInput => {
        addEmployee(employeeInput);
        return delay(1000).then(function() {
            return promptUser();
        });
    });
};

const updateEmployeeStart = () => {
    returnEmployee(function(result){
        const employees = result;
        const employeeSelect = employees.map(
            ({ id, first_name, last_name }) =>
            ({ 
                name: id + ' ' + first_name + ' ' + last_name 
            })
        );
        return inquirer.prompt(
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role would you like to update?",
                choices: employeeSelect
            }
        )
        .then(selectedEmployee => {
            returnRole(function(roleResult){
                const roles = roleResult;
                const roleSelect = roles.map(
                    ({ id, title }) =>
                    ({
                        name: id + ' ' + title
                    })
                )
                return inquirer.prompt(
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Which role would you like to assign?',
                        choices: roleSelect
                    }
                )
                .then(selectedRole => {
                    const employeeInfo = selectedEmployee.employee.split(' ');
                    const roleInfo = selectedRole.role.split(' ');
                    employeeId = employeeInfo[0];
                    roleId = roleInfo[0];
                    updateEmployee(roleId, employeeId);
                    return delay(1000).then(function() {
                        return promptUser();
                    });
                });
            });
        });
    });
};

// Added delay function to prevent callback prompt from executing before console.table executes.
const delay = (t, v) => {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

promptUser();