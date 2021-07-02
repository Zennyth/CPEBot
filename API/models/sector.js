const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sector', {
    idsector: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lblsector: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sector',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sector_pkey",
        unique: true,
        fields: [
          { name: "idsector" },
        ]
      },
    ]
  });
};
