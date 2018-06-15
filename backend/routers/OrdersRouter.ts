import * as express from "express";
import OrdersService from "../services/OrdersService";

export default class UsersRouter {
  private ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  public router() {
    const router = express.Router();

    router.post("/:id", this.add.bind(this));

    router.get("/prices/:id", this.getAllPrice.bind(this));
    router.get("/quantity/:id", this.getAllQuantity.bind(this));
    router.get("/user/:id", this.getByUserId.bind(this));
    router.get("/categories/:id", this.getAllQuantity.bind(this));
    router.get("/:id", this.getByOrderId.bind(this));
    
    router.put("/:id", this.update.bind(this));

    return router;
  }

  public add(req: express.Request, res: express.Response) {
    return this.ordersService
      .add(req.params.id, req.body)
      .then((result: any) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public getByOrderId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getByOrderId(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public getByUserId(req: express.Request, res: express.Response) {
    return this.ordersService
      .getByUserId(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public getAllPrice(req: express.Request, res: express.Response) {
    return this.ordersService
      .getAllPrice(req.params.id, req.query.dateOfQuery)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public getAllQuantity(req: express.Request, res: express.Response) {
    return this.ordersService
      .getAllQuantity(req.params.id, req.query.dateOfQuery)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public update(req: express.Request, res: express.Response) {
    return this.ordersService
      .update(req.params.id, req.body)
      .then((result: any) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }
}
