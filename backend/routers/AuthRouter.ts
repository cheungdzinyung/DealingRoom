import axios from "axios";
import * as express from "express";
import * as jwtSimple from "jwt-simple";
import config from "../config";

/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */
export default class AuthRouter {
 
  public getRouter() {
    const router = express.Router();
    router.post("/google", this.loginWithGoogle.bind(this));
    return router;
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
