import * as express from "express";
// ***** May use in future ****
// import * as bodyParser from "body-parser";
// import * as path from "path";
// import * as fs from "fs-extra";
// import * as multer from "multer";

import OrdersService from "../services/OrdersService";
import { IOrderData } from "../interfaces";

// const storage = multer.memoryStorage();
// const upload = multer({ dest: "../users", storage: storage });

export default class UsersRouter {
  private ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  router() {
    let router = express.Router();
    // router.put("/:id", upload.single("userPhoto"), this.updateUser.bind(this));
    router.get("/:id", this.getOrderByOrderId.bind(this));
    router.post("/:id", this.addOrder.bind(this));
    return router;
  }

  addOrder(req: express.Request, res: express.Response) {
    return this.ordersService
      .create(req.params.id, req.body)
      .then((result: IOrderData) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getOrderByOrderId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getOrderByOrderId(req.params.id)
      .then((result: IOrderData) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  // updateUser(req: express.Request, res: express.Response) {
  //   console.log(req.params.id, req.body);
  //   return this.ordersService
  //     .update(req.params.id, req.body)
  //     .then((result: IOrderData) => {
  //       res.status(201).json(result);
  //       console.log(result);
  //     })
  //     .catch((err: express.Errback) => {
  //       console.log("Post Error", err);
  //       res.status(500).json({ status: "failed" });
  //     });
  // }
}
