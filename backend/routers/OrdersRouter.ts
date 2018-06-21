import * as express from "express";
import ItemsService from "../services/ItemsService";
import OrdersService from "../services/OrdersService";

import { io } from "../app";

export default class UsersRouter {
  private ordersService: OrdersService;
  private itemsService: ItemsService;

  constructor(ordersService: OrdersService, itemsService: ItemsService) {
    this.ordersService = ordersService;
    this.itemsService = itemsService;
  }

  public router() {
    const router = express.Router();

    router.post("/", this.add.bind(this));

    router.get("/prices/", this.getAllPrice.bind(this));
    router.get("/user/", this.getByUser.bind(this));
    router.get("/", this.getAllOrders.bind(this));

    router.put("/:id", this.update.bind(this));

    return router;
  }

  public add(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .add(req.user.id, req.body)
        .then((result: any) => {
          return this.itemsService.getAll().then(orderList => {
            result[0].entireMenu = orderList;
            res.status(201).json(result);
            io.local.emit("action", {
              type: "SOCKET_UPDATE_ITEM_PRICE",
              entireMenu: (result[0].entireMenu)
            });
          });
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
    if (req.user !== undefined) {
      return this.ordersService
        .update(req.params.id, req.body)
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

  public getAllOrders(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .getAllOrders(req.user.id)
        .then((result: any) => {
          if (result === "customer") {
            res.status(401).json({ status: "unauthorized" });
          } else {
            res.status(201).json(result);
          }
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  }
}
