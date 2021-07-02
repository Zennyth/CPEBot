const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('module', {
    idmodules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lblmodule: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'module',
    schema: 'public',
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