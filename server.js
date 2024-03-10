const inquirer = require('inquirer');
const mysql = require('mysql2');
const sequelize = require('./config/connection');


init();

function init (){
    loadPrompts();
};


function loadPrompts(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all positions',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee position'
            ]
        }
    ])

    .then((choice) => {
        console.log(choice);
            switch (choice.choices){
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewPositions();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addPosition();
                    break; 
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee position':
                    updateEmployeePosition();
                    break;
                default: console.log('Welcome');                 
            }
    })
};


function viewDepartments(){
    mysql.query('Select * from departments', (err,rows) => {
        if(err) throw err;


        console.log('Procured data from database:');
        console.log(rows);
        init();
    });
};




function viewPositions(){
    mysql.query('Select * from positions', (err,rows) => {
        if(err) throw err;


        console.log('Procured data from database:');
        console.log(rows);
        init();
    });
};





function viewEmployees(){
    mysql.query('Select * from employees', (err,rows) => {
        if(err) throw err;


        console.log('Procured data from database:');
        console.log(rows);
        Init();
    });
};






function addDepartment(){
    const question = [
        {
            type: 'input',
            name: 'department',
            message: 'Name the new department'
        }
    ]

    inquirer.prompt(question)
    .then(answer => {
        mysql.query(`INSERT INTO departments(name) VALUES('${answer}')`, 
        function (err, row){
            if (err) {
                console.log(err);
            } else {
                console.log('Department added to database!');
                init();
            }
    })
    
})
};



function addPosition(){
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
            message: 'Creat a department id for role.'
        }
    ]

    inquirer.prompt(question)
    .then(answer => {
        mysql.query(`INSERT INTO role(id, title, salary, department_id) 
        VALUES('${answer.id}', '${answer.title}', '${answer.salary}', ${answer.departmentId}')`, 
        function (err, row){
            if (err) throw err;

            console.log('Role added to database!')
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
            message: 'Create a role id for employee.'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter manager id for employee'
        }
    ]

    inquirer.prompt(question)
    .then(answer => {
        mysql.query(`INSERT INTO employees(id, lastName, firstName, position_id, manager_id) 
        VALUES('${answer.id}', '${answer.lastName}', '${answer.firstName}', ${answer.positionId}', ${answer.managerId}')`, 
        function (err, row){
            if (err) throw err;

            console.log('Employee added to database!')
            })
        })
};