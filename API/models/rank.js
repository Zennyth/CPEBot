const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rank', {
    idmodules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idstudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idsemester: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    lblrank: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'rank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rank_pkey",
        unique: true,
        fields: [
          { name: "idmodules" },
          { name: "idstudent" },
          { name: "idsemester" }
        ]
      },
    ]
  });
};
