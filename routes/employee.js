var express = require("express");
var router = express.Router();
const employeeController = require("../controllers/employeeController");

/* GET employees listing. */
router.get("/", employeeController.index);
router.get("/:id", employeeController.employeebyid);
router.post("/", employeeController.insertEmp);
router.put("/:id", employeeController.updateEmp);
router.delete("/:id", employeeController.destroyEmp);

module.exports = router;
