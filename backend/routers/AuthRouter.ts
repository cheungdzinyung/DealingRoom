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
        console.log(result);
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
        if (err.code === "23505") {
          res.status(400).json({ status: "User already exist" });
        } else {
          res.status(500).json({ status: "failed" });
        }
      });
  }

  public localLogin(req: express.Request, res: express.Response) {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;
      this.knex("users")
        .where("username", username)
        .select("id", "username", "password")
        .then(user => {
          if (!user || !user[0]) {
            res.status(401).json("User does not exist");
            return;
          }
          bcrypt.compare(password, user[0].password).then(result => {
            if (result === true) {
              const payload = {
                id: user[0].id,
                username: user[0].username
              };
              const token = jwtSimple.encode(payload, config.jwtSecret);
              res.json({
                token,
                user_id: user[0].id
              });
            } else {
              res.status(401).json("Unauthorized, password error");
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      res.status(401).json("Please enter both password and username");
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
