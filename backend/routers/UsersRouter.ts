import * as express from "express";
// import * as bodyParser from "body-parser";
// import * as path from "path";
import * as multer from "multer";

import { IUserData } from "../interfaces";
import UsersService from "../services/UsersService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage: storage });

export default class UsersRouter {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  router() {
    let router = express.Router();
    router.put("/:id", upload.single("userPhoto"), this.updateUser.bind(this));
    router.get("/:id", this.getUser.bind(this));
    router.post("/", upload.single("userPhoto"), this.addUser.bind(this));
    return router;
  }

  addUser(req: express.Request, res: express.Response) {
    return this.usersService
      .create(req.body, req.file)
      .then((result: IUserData) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getUser(req: express.Request, res: express.Response) {
    return this.usersService
      .get(req.params.id)
      .then((data: IUserData) => {
        res.status(200).json(data);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  updateUser(req: express.Request, res: express.Response) {
    console.log(req.params.id, req.body);
    return this.usersService
      .update(req.params.id, req.body)
      .then((result: IUserData) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }
}
