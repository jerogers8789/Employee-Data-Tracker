const inquirer = require('inquirer');
const mysql = require('mysql');
const conTable = require('console.table');
const express = require('express')
require ('./assets/dotenv').config();

const sequelize = require('./assets/sequelize');
const app = express();
const PORT = process.env.PORT || 3306;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
if (err) throw err

