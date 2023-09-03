var express = require("express");
var router = express.Router();
const usersController = require("../controllers/userController");

/* GET users listing. */
router.get("/", usersController.index);
router.get("/:id", usersController.userbyid);
router.post("/", usersController.insert);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.destroy);

// authen
router.post("/login", usersController.login);

module.exports = router;
