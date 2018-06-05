import * as express from "express";
// import * as bodyParser from "body-parser";
// import * as path from "path";
import * as multer from "multer";

import UsersService from "../services/UsersService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage: storage });

export default class UsersRouter{
    private usersService: UsersService;

    constructor(usersService: UsersService){
        this.usersService = usersService;
    }

    router(){
        let router = express.Router();
    router.post("/", upload.single("userPhoto"), this.addUser.bind(this));
    return router;
    }

    addUser(req: express.Request, res: express.Response) {
        // console.log(req.body, typeof(req.file));
        return this.usersService
          .create(req.body, req.file.buffer)
          .then(result => {
            res.json({ status: "success" });
            console.log(result);
          })
          .catch(err => {
            console.log("Post Error", err);
            res.status(500).json({ status: "failed" });
          });
      }
}