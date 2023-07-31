var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var employeeRouter = require("./routes/employee");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); // http://localhost:3000
app.use("/users", usersRouter); // http://localhost:3000/users
app.use("/employee", employeeRouter); // http://localhost:3000/employee

module.exports = app;
