const database = require("../database/database")
const { INTEGER, STRING } = require('sequelize')

const Admin = database.define('admin', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false,

    },
    email: {
        type: STRING,
        allowNull: false,
    },
    password: {
        type: STRING,
        allowNull: false
    }

})

module.exports = Admin