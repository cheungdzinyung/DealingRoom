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
        if (err.code === '23505') {
          res.status(400).json({ status: "User already exist" });
        } else {
          res.status(500).json({ status: "failed" });
        }
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
    } else {
      try {
        const authResult = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        );

        if (authResult.data.error) {
          res.sendStatus(401);
        } else {
          console.log(authResult.data);
          const token = jwtSimple.encode(
            { id: accessToken, info: authResult.data },
            config.jwtSecret
          );
          res.json({ token });
        }
      } catch (err) {
        res.sendStatus(401);
      }
    }
  }

  public async loginWithFacebook(req: express.Request, res: express.Response) {
    const accessToken = req.body.accessToken;
    // console.log(accessToken);
    if (!accessToken) {
      res.sendStatus(401).json({ errMsg: "missing access token" });
    } else {
      try {
        const result = await axios.get(
          `https://graph.facebook.com/me?access_token=${accessToken}`
        );

        if (result.data.error) {
          // console.log("auth result err ", result.data.error);
          throw new Error(result.data.error);
        } else {
          // console.log("authResult ", result.data);

          // TODO : find FB user from DB
          // if true => res.json(usually login result)
          // TODO
          // if false => add to DB, send back usually sign up result
          const signUpPackage = {
            // vvv required
            displayName: result.data.name,
            facebookToken: accessToken,
            isActive: true,
            password: accessToken,
            role: "customer",
            username: result.data.id,
            // vvv to match data tpye
            id: 0,
            // vvv maybe?
            userPhoto: "",
          }
          await this.usersService
          .add(signUpPackage, req.file)
          .then((addResult: IUserData) => {
            console.log(addResult);

            const jwtToken = jwtSimple.encode(
              { id: addResult.id, info: addResult.username },
              config.jwtSecret
            );
            
            res.status(200).json({ ...addResult, token: jwtToken});
          })
          .catch((err: express.Errback) => {
            console.log("add user err: ", err);
            res.status(500).json({ err, status: "failed" });
          });

          // console.log(result);
          // res.json({ jwtToken });

          // cannot set status since axios have set it already
          // err code: Can't set headers after they are sent
          // res.sendStatus(200).json({token});
        }

      } catch (err) {
        res.sendStatus(401).json({ err });
      }
    }
  }
}
