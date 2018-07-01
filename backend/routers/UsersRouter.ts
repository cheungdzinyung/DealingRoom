import * as express from "express";
import * as jwtSimple from "jwt-simple";
import * as multer from "multer";

import config from "../config";

import { IUserData } from "../interfaces";
import UsersService from "../services/UsersService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage });

export default class UsersRouter {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  public router() {
    const router = express.Router();

    router.get("/", this.get.bind(this));
    router.put("/", upload.single("userPhoto"), this.update.bind(this));

    return router;
  }

  public get(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.usersService
        .get(req.user.id)
        .then((result: IUserData) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      res.status(401).json({ status: "unauthorized" });
      return {};
    }
  }

  public update(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.usersService
        .update(req.user.id, req.body, req.file)
        .then((result: IUserData) => {
          const payload = {
            id: result[0].id,
            username: result[0].username
          };
          const token = jwtSimple.encode(payload, config.jwtSecret);
          res.json({
            token,
            user_id: result[0].id,
            displayName: result[0].displayName,
            userPhoto: result[0].userPhoto
          });
        })
        .catch((err: any) => {
          res.status(500).json(err);
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }
}
