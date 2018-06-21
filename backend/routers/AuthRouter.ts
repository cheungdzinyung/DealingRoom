import axios from "axios";
import * as bcrypt from "bcrypt";
import * as express from "express";
import * as jwtSimple from "jwt-simple";
import * as Knex from "knex";
import * as multer from "multer";
import config from "../config";

import { IUserData } from "../interfaces";
import UsersService from "../services/UsersService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage });

export default class AuthRouter {
  private knex: Knex;
  private usersService: UsersService;

  constructor(knex: Knex, usersService: UsersService) {
    this.knex = knex;
    this.usersService = usersService;
  }

  public getRouter() {
    const router = express.Router();
    router.post("/google", this.loginWithGoogle.bind(this));
    router.post("/facebook", this.loginWithFacebook.bind(this));
    router.post("/login", upload.single(), this.localLogin.bind(this));
    router.post("/signup", upload.single("userPhoto"), this.signUp.bind(this));
    return router;
  }

  public signUp(req: express.Request, res: express.Response) {
    return this.usersService
      .add(req.body, req.file)
      .then((result: IUserData) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        console.log(err);
        res.status(500).json({ status: "failed" });
      });
  }

  public async localLogin(req: express.Request, res: express.Response) {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      const userId = await this.knex("users")
        .select("id", "username", "password")
        .where("username", username);
      bcrypt.compare(password, userId[0].password).then(result => {
        if (result === true) {
          const payload = {
            id: userId[0].id,
            username: userId[0].username
          };
          const token = jwtSimple.encode(payload, config.jwtSecret);
          res.json({
            token,
            user_id: userId[0].id
          });
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401).json("need password and username");
    }
  }

  public async loginWithGoogle(req: express.Request, res: express.Response) {
    const accessToken = req.body.accessToken;
    console.log(accessToken);
    if (!accessToken) {
      res.sendStatus(401);
    }
    try {
      const authResult = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      if (authResult.data.error) {
        res.sendStatus(401);
      }
      console.log(authResult.data);
      const token = jwtSimple.encode(
        { id: accessToken, info: authResult.data },
        config.jwtSecret
      );
      res.json({ token });
    } catch (err) {
      res.sendStatus(401);
    }
  }

  public async loginWithFacebook(req: express.Request, res: express.Response) {
    const accessToken = req.body.accessToken;
    console.log(accessToken);
    if (!accessToken) {
      res.sendStatus(401);
    }
    try {
      const authResult = await axios.get(
        `https://graph.facebook.com/me?access_token=${accessToken}`
      );

      if (authResult.data.error) {
        res.sendStatus(401);
      }
      console.log(authResult.data);
      const token = jwtSimple.encode(
        { id: accessToken, info: authResult.data },
        config.jwtSecret
      );
      res.json({ token });
    } catch (err) {
      res.sendStatus(401);
    }
  }
}
