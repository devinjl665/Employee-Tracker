// Import required modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'JoyboyG5!',
    database: 'employee_db',
});

console.log('Welcome to your employee database!');

// Main function to initiate the application
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ],
        }
    ])
    .then((answer) => {
        // Switch based on user choice
        switch (answer.choices) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                process.exit();
        }
    });    
};

// Function to view all departments
function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.error('Error viewing departments:', err);
        } else {
            console.table(results);
            init();
        }    
    });
};

// Function to view all roles
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.error('Error viewing roles:', err);
        } else {
            console.table(results);
            init();
        }
    });
};

// Function to view all employees
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.error('Error viewing employees:', err);
        } else {
            console.table(results);
            init();
        }
    });
};

// Function to add a department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Name the new department'
    })
    .then(answer => {
        const departmentName = answer.departmentName;
        db.query('INSERT INTO departments(name) VALUES(?)', [departmentName], function (err, results) {
            if (err) {
                console.error('Error adding department:', err);
            } else {
                console.log('Department added to the database!');
            }
            init();
        });
    });
};

// Function to add a role
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Create an id for the role.'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary for role.'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id for role.'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO roles(id, title, salary, department_id) VALUES(?, ?, ?, ?)', 
        [answer.id, answer.title, answer.salary, answer.departmentId], 
        function (err, results){
            if (err) {
                console.log(err);
            } else {
                console.log('Role added to database!');
                init();
            }  
        })
    })
};

// Function to add an employee
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Create an id for the employee.'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name.'
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name.'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role id for employee.'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter manager id for employee'
        }
    ])
    .then((answer) => {
        db.query('INSERT INTO employees(id, last_name, first_name, role_id, manager_id) VALUES(?, ?, ?, ?, ?)', 
        [answer.id, answer.last_name, answer.first_name, answer.role_id, answer.manager_id],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
            console.log('Employee added to database!');
            init();
            }
        })
    })
};

// Function to update an employee's role
function updateEmployeeRole() {
    db.query('SELECT * FROM employees', function (err, employees) {
        if (err) {
            console.log(err);
        } else {
            console.table(employees);

            db.query('SELECT * FROM roles', function (err, roles) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(roles);

                    // Prompt user to select employee, role, and manager
                    inquirer.prompt([
                        {
                            name: 'employeeId',
                            type: 'list',
                            message: 'Select employee to update their role:',
                            choices: employees.map(employee => ({
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id
                            }))
                        },
                        {
                            name: 'roleId',
                            type: 'list',
                            message: 'Select new role for the employee:',
                            choices: roles.map(role => ({
                                name: role.title,
                                value: role.id
                            }))
                        },
                        {
                            name: 'managerId',
                            type: 'list',
                            message: 'Select new manager for the employee:',
                            choices: [
                                ...employees.map(manager => ({
                                    name: manager.id,
                                    value: manager.id
                                })),
                                {
                                    name: 'None',
                                    value: null
                                }
                            ]  
                        }
                    ])
                    .then(answer => {
                        // Update the employee's role and manager in the database
                        const { employeeId, roleId, managerId } = answer;
                        db.query('UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ?', [roleId, managerId, employeeId], function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Employee role and manager updated successfully!');
                                init(); // Go back to the main menu
                            }
                        });
                    });
                }
            });
        }
    });
}

// Call the init function to start the application
init();
