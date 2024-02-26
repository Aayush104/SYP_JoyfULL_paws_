module.exports = (sequelize, DataTypes) => {
    const  Pet= sequelize.define("pet", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PetName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PetGender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Health: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Petsize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Age: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PetLikings: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AboutPet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Breed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PetPhoto: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Pet;
};
