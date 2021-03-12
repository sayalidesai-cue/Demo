const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },        
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            default: null,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            default: null,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            default: null,
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: "Username already exists"
            },
            allowNull: false,
            default: null,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            default: null,
        },     
        createdBy: {
            type: DataTypes.BIGINT,
            allowNull: false,
            default: null,
        },
        updatedBy: {
            type: DataTypes.BIGINT,
            allowNull: false,
            default: null,
        }
    });


    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate((user) => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return User;
}