const express = require("express");

module.exports = class UsersRouter {
  constructor(usersService) {
    this.usersService = usersService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }

  post(req, res) {
      // console.log (req.body);
    return this.usersService
      .create(req.body)
      .then(arr => {
        res.json({ status: "success" }, arr);
      })
      .catch(err => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }
};
