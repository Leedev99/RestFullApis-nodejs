const bcryptjs = require("bcryptjs");
const models = require("../models/index");
exports.index = async (req, res, next) => {
  // const users = await models.User.findAll() // select * form User

  // const users = await models.User.findAll({
  //   //   attributes: ["id", "name", "email", "created_at"], // select field
  //   attributes: ["id", "name", ["email", "username"], "created_at"], // change field email as username
  //   // attributes: { exclude: ["password"] },
  //   // where: {
  //   //   email: "khamla@gmail.com", //select where
  //   // },
  //   order: [["id", "desc"]],
  // });

  // write sql by self
  const sql = "select id,name,email,created_at from users order by id desc";
  const users = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT,
  });

  res.status(200).json({
    message: "success",
    data: users,
  });
};

exports.userbyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await models.User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
// Insert data
exports.insert = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check duplicate email
    const existEmail = await models.User.findOne({ where: { email: email } });

    if (existEmail) {
      const error = new Error("Duplicate email please try new email");
      error.statusCode = 400;
      throw error;
    }

    /// has password
    const salt = await bcryptjs.genSalt(8);
    const passwordHash = await bcryptjs.hash(password, salt);

    const user = await models.User.create({
      name,
      email,
      password: passwordHash,
    });
    res.status(201).json({
      message: "success inserted",
      data: {
        id: user.id,
        email: user.email,
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
exports.update = async (req, res, next) => {
  try {
    const { id, name, email, password } = req.body;

    if (req.params.id !== id) {
      const error = new Error("ລະຫັດຜູ້ໃຊ້ບໍຖືກຕ້ອງ");
      error.statusCode = 400;
      throw error;
    }

    // check duplicate email
    const existEmail = await models.User.findOne({ where: { email: email } });

    if (existEmail) {
      const error = new Error("Duplicate email please try new email");
      error.statusCode = 400;
      throw error;
    }

    /// has password
    const salt = await bcryptjs.genSalt(8);
    const passwordHash = await bcryptjs.hash(password, salt);

    const user = await models.User.update(
      {
        name,
        email,
        password: passwordHash,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json({
      message: "user has been success updated",
      data: {
        id: user.id,
        email: user.email,
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
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await models.User.findByPk(id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    await models.User.destroy({
      where: {
        id: id,
      },
    });

    res.status(201).json({
      message: "user has been success deleted",
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: [],
    });
  }
};
