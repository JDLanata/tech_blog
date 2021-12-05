const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init({
    words: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,

    }
},{
    sequelize
});

module.exports = Comment