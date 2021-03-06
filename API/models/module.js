const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('module', {
    idmodules: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lblmodule: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rankmodule: {
      type: DataTypes.CHAR(1),
      allowNull : true
    }
  }, {
    sequelize,
    tableName: 'module',

    timestamps: false,
    indexes: [
      {
        name: "module_pkey",
        unique: true,
        fields: [
          { name: "idmodules" },
        ]
      },
    ]
  });
};
