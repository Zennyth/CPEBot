const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade', {
    idmodules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'module',
        key: 'idmodules'
      }
    },
    idstudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'idstudent'
      }
    },
    idsemester: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'semester',
        key: 'idsemester'
      }
    },
    lblgrade: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    typegrade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    numbergrade: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    coeffgrade: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grade',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grade_pkey",
        unique: true,
        fields: [
          { name: "idmodules" },
          { name: "idstudent" },
          { name: "idsemester" },
          { name: "lblgrade" },
        ]
      },
    ]
  });
};
