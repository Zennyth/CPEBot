const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('semester', {
    idsemester: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'semester',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "semester_pkey",
        unique: true,
        fields: [
          { name: "idsemester" },
        ]
      },
    ]
  });
};
