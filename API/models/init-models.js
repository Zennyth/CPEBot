var DataTypes = require("sequelize").DataTypes;
var _grade = require("./grade");
var _module = require("./module");
var _promotion = require("./promotion");
var _sector = require("./sector");
var _semester = require("./semester");
var _student = require("./student");

function initModels(sequelize) {
  var grade = _grade(sequelize, DataTypes);
  var module = _module(sequelize, DataTypes);
  var promotion = _promotion(sequelize, DataTypes);
  var sector = _sector(sequelize, DataTypes);
  var semester = _semester(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);

  grade.belongsTo(module, { as: "idmodules_module", foreignKey: "idmodules"});
  module.hasMany(grade, { as: "grades", foreignKey: "idmodules"});
  student.belongsTo(promotion, { as: "yearpromotion_promotion", foreignKey: "yearpromotion"});
  promotion.hasMany(student, { as: "students", foreignKey: "yearpromotion"});
  student.belongsTo(sector, { as: "idsector_sector", foreignKey: "idsector"});
  sector.hasMany(student, { as: "students", foreignKey: "idsector"});
  grade.belongsTo(semester, { as: "idsemester_semester", foreignKey: "idsemester"});
  semester.hasMany(grade, { as: "grades", foreignKey: "idsemester"});
  grade.belongsTo(student, { as: "idstudent_student", foreignKey: "idstudent"});
  student.hasMany(grade, { as: "grades", foreignKey: "idstudent"});
  
  return {
    grade,
    module,
    promotion,
    sector,
    semester,
    student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
