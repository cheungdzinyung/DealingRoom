const express = require("express");
const app = express();
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);
const bodyParser = require("body-parser");
const multer = require("multer");

const UsersRouter = require("./routers/UsersRouter");
const UsersService = require("./services/UsersService");

let usersService = new UsersService(knex);
let usersRouter = new UsersRouter(usersService);

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter.route());

app.set("port", 5000);
app.listen(app.get("port"), function() {
  console.log("Server is listening on port " + app.get("port"));
});
