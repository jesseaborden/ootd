const Sequelize = require('../database.js').Sequelize;
const database = require('../database.js').database;
const bcrypt = require('bcrypt-nodejs');

const User = database.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING, 
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
});

module.exports = User;