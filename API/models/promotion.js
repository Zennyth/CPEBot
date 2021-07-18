const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotion', {
    yearpromotion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'promotion',

    timestamps: false,
    indexes: [
      {
        name: "promotion_pkey",
        unique: true,
        fields: [
          { name: "yearpromotion" },
        ]
      },
    ]
  });
};
