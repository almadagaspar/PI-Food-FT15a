const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {             // Aparece en la API como 'title'.
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {         // Resumen del plato. Aparece en la API como 'summary'.
      type: DataTypes.TEXT,
      allowNull: false,

    },

    score: {             // Puntiación. Aparece en la API como 'spoonacularScore'.
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.0

    },

    healthScore: {        // Nivel de comida saludable. Aparece en la API como 'healthScore'.
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.0
    },

    instructions: {      // Paso a paso. Aparece en la API como 'instructions'.  
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'There are not instructions'
    },

    createdInDb: {         // BORRAR SI AVANZANDO EN EL PI, NO RESULTA NECESARIO.
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  });
};
