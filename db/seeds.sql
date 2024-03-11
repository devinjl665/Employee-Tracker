INSERT INTO departments (name)
VALUES ('Sales'),
       ('Management'),
       ('IT'),
       ('Customer Service'),
       ('Payment Processing');



INSERT INTO roles (id, title, salary, department_id)
VALUES (10, 'Salesperson', 60000, 1),
       (21,'Team Lead', 65000, 2),
       (32, 'Front End Developer', 80000, 3),
       (43, 'Customer Service', 52000, 4),
       (54, 'Payment Processing', 42800, 5),
       (65, 'Back End Developer', 81000, 3),
       (76, 'Pre-Customer Service', 40000, 4);



INSERT INTO employees (id, last_name, first_name, role_id, manager_id)
VALUES (1, 'Keaton', 'Michael',21, NULL),
       (2, 'Tobin', 'Beef',54, 1),
       (3, 'Winn', 'Anita Max',21, NULL),
       (4, 'Goodman', 'Saul',10, 3),
       (5, 'Guzman', 'Joaquin',10, 3),
       (6, 'Pickles', 'Tommy',43, 2),
       (7, 'Dragunov', 'Sergei',76, NULL); 
