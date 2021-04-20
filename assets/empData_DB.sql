DROP DATABASE IF EXISTS empData_DB;

CREATE DATABASE empData_DB;

USE empData_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUE ('Communications');
INSERT INTO department (name)
VALUE ('IT');
INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name)
VALUE ('Sales');

INSERT INTO role (title, salary, department_id)
VALUE ('DB Administrator', 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Director', 850000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 55000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Marketing Director', 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Salesperson', 65000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Software Engineer', 95000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Financial Analyst', 250000, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Bugs', 'Bunny', null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Donald', 'Duck', null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Sylvester','Slick', null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Tweety','Bird', 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Tom','Cat', 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ('Jerry','Mouse', 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;