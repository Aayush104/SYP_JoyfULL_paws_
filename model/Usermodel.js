module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Otp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        OtpGeneratedTime: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });
    return User;
};
