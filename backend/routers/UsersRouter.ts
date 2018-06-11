import * as express from "express";
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

    router.post("/", upload.single("userPhoto"), this.add.bind(this));

    router.get("/:id", this.get.bind(this));

    router.put("/:id", upload.single("userPhoto"), this.update.bind(this));

    return router;
  }

  add(req: express.Request, res: express.Response) {
    return this.usersService
      .add(req.body, req.file)
      .then((result: IUserData) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  get(req: express.Request, res: express.Response) {
    return this.usersService
      .get(req.params.id)
      .then((result: IUserData) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  update(req: express.Request, res: express.Response) {
    console.log(req.params.id, req.body);
    return this.usersService
      .update(req.params.id, req.body, req.file)
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
