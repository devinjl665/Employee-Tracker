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

function init (){
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
        console.log(choice);
            switch (choice.choices){
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
                default: console.log('Welcome');                 
            }
    })
};


function viewDepartments(){
    db.query('Select * from departments', (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Procured data from database:');
            console.log(rows);
            init();
        }
    });
};


function viewRoles(){
    db.query('Select * from roles', (err,rows) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Procured data from database:');
            console.log(rows);
            init();
        }
    });
};


function viewEmployees(){
    db.query('Select * from employees', (err,rows) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Procured data from database:');
            console.log(rows);
            init();
        }
    });
};


function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'savedDepartment',
        message: 'Name the new department'
    })
    .then(answer => {
        let savedDepartment = answer.savedDepartment;
        db.query('INSERT INTO departments(name) VALUES(?)', [savedDepartment], 
        function (err, rows){
            if (err) {
                console.log(err);
            } else {
                console.log('Department added to the database!');
                console.log(rows);
                init();
            }
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
    .then(answer => {
        db.query('INSERT INTO role(id, title, salary, department_id) VALUES(?)', 
        function (err, rows){
            if (err) {
                console.log(err);
            } else {
                console.log('Role added to database!');
                console.log(rows);
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
    .then(answer => {
        db.query('INSERT INTO employees(id, lastName, firstName, position_id, manager_id) VALUES(?)', 
        function (err, rows){
            if (err) {
                console.log(err);
            } else {
            console.log('Employee added to database!');
            console.log(rows);
            init();
            }
        })
    })
};


init();