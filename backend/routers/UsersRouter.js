const express = require("express");

module.exports = class UserRouter {
  constructor(userService) {
    this.userService = userService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }

  post(req, res) {
    return this.userService
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
