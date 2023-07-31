"use strict";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      emp_name: DataTypes.STRING,
      emp_role: DataTypes.STRING,
      emp_tel: DataTypes.STRING,
      emp_address: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "employees",
      timestamps: false,
    }
  );
  Employee.associate = function (models) {
    // define association here
  };
  return Employee;
};
