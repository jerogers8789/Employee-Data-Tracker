 const inquirer = require('inquirer');
 const mysql = require('mysql');
 const conTable = require('console.table');
 const util = require('util')
 require('dotenv').config()
 const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MY_DB_PW,
    database: 'empData_DB',
    multipleStatements: true
});
connection.connect(function(err) {
    if (err) throw err
    console.log('Connection ID' + connection.threadId)
    runApp();
});

function runApp (){
    inquirer.prompt([
    {
    name: 'options',
    type: 'list',
    message: 'Select an Option.',
    choices: [
              'View Employees', 
              'View Employees By Pos',
              'View Employees By Dept', 
              'Update Employee info',
              'Add Employee',
              'Add Role',
              'Add Dept'
            ]
    }
]).then(function(val) {
        switch (val.options) {
            case 'View Employees':
              viewAllEmp();
            break;
    
          case 'View Employees By Pos':
              viewPos();
            break;
          case 'View Employees By Dept':
              viewDept();
            break;
          
          case 'Add Employee':
                addEmp();
              break;

          case 'Update Employee info':
                updateEmp();
              break;
      
            case 'Add Role':
                addPos();
              break;
      
            case 'Add Dept':
                addDept();
              break;
    
            }
})};
function viewAllEmp() {
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;', 
    function(err, res) {
      if (err) throw err
      console.table(res)
      runApp()
})};
function viewPos() {
  connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;', 
  function(err, res) {
  if (err) throw err
  console.table(res)
  runApp()
})};
function viewDept() {
  connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;', 
  function(err, res) {
    if (err) throw err
    console.table(res)
    runApp()
})};
let posArray = [];
function selectPos() {
  connection.query('SELECT * FROM role', function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      posArray.push(res[i].title);
    }})
  return posArray;
};
let managerArray = [];
function selectManager() {
  connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArray.push(res[i].first_name);
    }})
  return managerArray;
};
async function addEmp() { 
  const managers = await selectManager();
    inquirer.prompt([
        {
          name: 'first-name',
          type: 'input',
          message: 'Enter first name'
        },
        {
          name: 'last-name',
          type: 'input',
          message: 'Enter last name'
        },
        {
          name: 'position',
          type: 'list',
          message: 'Select Job Title',
          choices: await selectPos()
        },
        {
          name: 'manager',
          type: 'rawlist',
          message: 'Select the Employees manager',
          choices: await selectManager()
        }
    ]).then(function (res) {
      let roleId = selectPos().indexOf(res.position) + 1
      let managerId = selectManager().indexOf(res.manager) + 1
      connection.query('INSERT INTO employee SET ?', 
      {
          first_name: res.firstName,
          last_name: res.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(res)
          runApp()
      })
})};
async function updateEmp() {
    connection.query('SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;', function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: 'lastName',
            type: 'rawlist',
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: 'Select employees last name',
          },
          {
            name: 'newRole',
            type: 'rawlist',
            message: 'Enter new job title',
            choices: selectPos()
          },
      ]).then(function(res) {
        var roleId = selectPos().indexOf(res.role) + 1
        connection.query('UPDATE employees SET WHERE ?', 
        {
          last_name: res.lastName
        }, 
        {
          role_id: roleId           
        }, 
        function(err){
            if (err) throw err
            console.table(res)
            runApp()
        })
    });
})};

function addPos() { 
  connection.query('SELECT role.title AS Title, role.salary AS Salary FROM role',   function(err, res) {
    inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter Job Title'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter Salary'
        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runApp();
            }
        )
    });
})};
function addDept() { 
    inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Enter new Dept. name'
        }
    ]).then(function(res) {
        var query = connection.query(
            'INSERT INTO department SET ?',
            {
              name: res.name           
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runApp();
            }
        )
})};