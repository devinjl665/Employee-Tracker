# Employee-Tracker

## Description

Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Demo

<a href="">Employee Tracker Demo Vid</a>

## Installation

<a href="https://www.npmjs.com/package/mysql2">MySQL</a> is the newest implementation used for the project. It also uses Inquirer and Node.js. All three must be installed in order for this project to function properly. You can run "npm install" in the integrated terminal to install any other dependencies possibly needed for this project. 

## Usage

Run "npm start" in the project's integrated terminal. Once the project has started you will given options to view departments, roles, and employees or add a department, role, and employee. You will also be given the option to update an existing employee's role and manager id. If you choose to add or update, you will be met with prompts to complete task. Lastly, if you no longer need to access or update the database, you can exit the application.

## Credits

I wrote this code with the help of Wash U in Saint Louis coursework, Stack Overflow, and W3Schools. I referenced mysql documentation for proper use as well.

## User Story

As business owner I want to be able to view and manage the departments, roles, and employees in my companyso that I can organize and plan my business.

## Acceptance Criteria

GIVEN a command-line application that accepts user input

WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Contact Me

Email: [devinjl665@gmail.com](mailto:devinjl665@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)