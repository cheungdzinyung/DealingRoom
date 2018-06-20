import * as express from "express";
import OrdersService from "../services/OrdersService";

export default class UsersRouter {
  private ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  public router() {
    const router = express.Router();

    router.post("/", this.add.bind(this));

    router.get("/prices/", this.getAllPrice.bind(this));
    router.get("/user/", this.getByUser.bind(this));

    router.put("/", this.update.bind(this));

    return router;
  }

  public add(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .add(req.user.id, req.body)
        .then((result: any) => {
          res.status(201).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }

  public getByUser(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .getByUser(req.user.id)
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }

  public getAllPrice(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .getAllPrice(req.user.id, req.query.dateOfQuery)
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }

  public update(req: express.Request, res: express.Response) {
    if (req.user !== undefined ) {
      return this.ordersService
        .update(req.user.id, req.body)
        .then((result: any) => {
          res.status(201).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }
}
