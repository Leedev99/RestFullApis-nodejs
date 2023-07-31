const bcryptjs = require("bcryptjs");
const models = require("../models/index");
exports.index = async (req, res, next) => {
  const employee = await models.Employee.findAll(); // select * form Employee

  // const employee = await models.Employee.findAll({
  //   attributes: ["id", "emp_name", "emp_role","emp_tel","emp_address","created_at"], // select field
  // attributes: [
  //   "id",
  //   "emp_name",
  //   "emp_role",
  //   ["emp_tel", "phoneNumber"],
  //   "emp_address",
  //   "created_at",
  // ], // change field emp_tel as phoneNumber
  // attributes: { exclude: ["emp_tel"] },
  // where: {
  //   emp_tel: "2098763062", //select where
  // },
  // order: [["id", "desc"]],
  // });

  // write sql by self ------------------------

  // const sql =
  //   "select id,emp_name,emp_role,emp_tel,emp_address,created_at from employees order by id desc";
  // const employee = await models.sequelize.query(sql, {
  //   type: models.sequelize.QueryTypes.SELECT,
  // });

  res.status(200).json({
    message: "success",
    data: employee,
  });
};

exports.employeebyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "success",
      data: employee,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
// Insert data
exports.insertEmp = async (req, res, next) => {
  try {
    const { emp_name, emp_role, emp_tel, emp_address } = req.body;

    // check duplicate email
    const existName = await models.Employee.findOne({
      where: { emp_name: emp_name },
    });

    if (existName) {
      const error = new Error("Duplicate employee please try new name");
      error.statusCode = 400;
      throw error;
    }

    const employee = await models.Employee.create({
      emp_name,
      emp_role,
      emp_tel,
      emp_address,
    });
    res.status(201).json({
      message: "success inserted",
      data: {
        id: employee.id,
        name: employee.emp_name,
      },
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
// Update data
exports.updateEmp = async (req, res, next) => {
  try {
    const { id, emp_name, emp_role, emp_tel, emp_address } = req.body;

    if (req.params.id !== id) {
      const error = new Error("ລະຫັດຜູ້ໃຊ້ບໍຖືກຕ້ອງ");
      error.statusCode = 400;
      throw error;
    }

    // check duplicate email
    const existEpm = await models.Employee.findOne({
      where: { emp_name: emp_name },
    });

    if (existEpm) {
      const error = new Error("Duplicate Employee");
      error.statusCode = 400;
      throw error;
    }

    const employee = await models.Employee.update(
      {
        emp_name: emp_name,
        emp_role: emp_name,
        emp_tel: emp_name,
        emp_address: emp_name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json({
      message: "Employee has been success updated",
      data: {
        id: id,
        name: emp_name,
      },
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
//destory
exports.destroyEmp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      throw error;
    }
    await models.Employee.destroy({
      where: {
        id: id,
      },
    });

    res.status(201).json({
      message: "Employee has been success deleted",
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
