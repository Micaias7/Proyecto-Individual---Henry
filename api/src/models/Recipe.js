const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4(),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.STRING
    },
//agregue image para poder agregarle una img cuando se cree en el post
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/2385/2385961.png"
    }
  });
};
// si no quiero mostrar  createdAt | updatedAt en db agrego como tercer parametro
// { timestamps: false }

// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Nivel de "comida saludable" (health score)
// Paso a paso