const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The name is required',
        }
      },
    },
    height_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });
};
