import * as express from "express";

import OrdersService from "../services/OrdersService";

export default class UsersRouter {
  private ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  router() {
    let router = express.Router();
    router.put("/:id", this.updateOrder.bind(this));
    router.get("/:id", this.getOrderByOrderId.bind(this));
    router.get("/user/:id", this.getOrderByUserId.bind(this));
    router.post("/:id", this.addOrder.bind(this));
    return router;
  }

  addOrder(req: express.Request, res: express.Response) {
    return this.ordersService
      .create(req.params.id, req.body)
      .then((result: any) => {
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
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getOrderByUserId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getOrderByUserId(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }
  
  updateOrder(req: express.Request, res: express.Response) {
    console.log(req.params.id, req.body);
    return this.ordersService
      .update(req.params.id, req.body)
      .then((result: any) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }
}
