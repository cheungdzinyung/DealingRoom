import * as express from "express";
import OrdersService from "../services/OrdersService";

export default class UsersRouter {
  private ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  router() {
    let router = express.Router();

    router.post("/:id", this.add.bind(this));

    router.get("/:id", this.getByOrderId.bind(this));
    router.get("/user/:id", this.getByUserId.bind(this));
    router.get("/prices/:id", this.getAllPrice.bind(this));
    router.get("/categories/:id", this.getAllQuantity.bind(this));

    router.put("/:id", this.update.bind(this));

    return router;
  }

  add(req: express.Request, res: express.Response) {
    return this.ordersService
      .add(req.params.id, req.body)
      .then((result: any) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getByOrderId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getByOrderId(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getByUserId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getByUserId(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getAllPrice(req: express.Request, res: express.Response) {
    return this.ordersService
      .getAllPrice(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getAllQuantity(req: express.Request, res: express.Response) {
    return this.ordersService
      .getAllQuantity(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  update(req: express.Request, res: express.Response) {
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
