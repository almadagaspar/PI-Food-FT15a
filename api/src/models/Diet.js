const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet', {

        // Al no definidtle una Primary Key, se le agregará una Primary Key númerica y autoincrementable automáticamente.
        name: {        // Nombre de la dieta.
            type: DataTypes.STRING,
            allowNull: true,
        },

    });
};
