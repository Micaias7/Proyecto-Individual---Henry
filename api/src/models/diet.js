const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false }); 
};

// si no le paso id, sequelize le pone uno

// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre