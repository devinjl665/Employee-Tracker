const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'joyboy5!',
    database: 'employee_db',
});

console.log('Welcome to your employee database!');

function init() {
    console.log('Before inquirer prompt');
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
                'Update an employee position',
                'Exit'
            ]
        }
    ])
    .then((choice) => {
        console.log('After Inquirer Prompt');
        console.log('Choice:', choice.choices); // Log the choice to check its value
        switch (choice.choices) {
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
            case 'Update an employee position':
                updateEmployeePosition();
                break;
            case 'Exit':
                process.exit();
                break; // Make sure to add a break statement here
            default:
                console.log('Invalid choice'); // Log if the choice is not recognized
        }
        console.log('After switch statement'); // Log to check if this line is executed
        init(); // Prompt again outside the switch statement
    });    
}

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.error('Error viewing departments:', err);
        } else {
            console.table(results);
        }
        init();
    });
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.error('Error viewing roles:', err);
        } else {
            console.table(results);
        }
        init();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.error('Error viewing employees:', err);
        } else {
            console.table(results);
        }
        init();
    });
}

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
}


function addRole(){
    const question = [
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
    ]

    inquirer.prompt(question)
    .then((answer) => {
        db.query('INSERT INTO role(id, title, salary, department_id) VALUES(?, ?, ?, ?)', 
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


function addEmployee(){
    const question = [
        {
            type: 'input',
            name: 'id',
            message: 'Create an id for the employee.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name.'
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name.'
        },
        {
            type: 'input',
            name: 'positionId',
            message: 'Enter the role id for employee.'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter manager id for employee'
        }
    ]

    inquirer.prompt(question)
    .then((answer) => {
        db.query('INSERT INTO employees(id, lastName, firstName, position_id, manager_id) VALUES(?, ?, ?, ?, ?)', 
        [answer.id, answer.lastName, answer.firstName, answer.positionId, answer.managerId],
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


init();