const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    idstudent: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    yearpromotion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      references: {
        model: 'promotion',
        key: 'yearpromotion'
      }
    },
    idsector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sector',
        key: 'idsector'
      }
    },
    mailstudent: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    passwordstudent: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    pseudostudent: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    tokenlogstudent: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    socketstudent: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ispublic: {
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    }
  }, {
    sequelize,
    tableName: 'student',

    timestamps: false,
    indexes: [
      {
        name: "student_pkey",
        unique: true,
        fields: [
          { name: "idstudent" },
        ]
      },
    ]
  });
};
