import * as express from "express";
import { io } from "../app";
import ItemsService from "../services/ItemsService";
import OrdersService from "../services/OrdersService";

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
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth() + 1;
    const currentDate = new Date().getUTCDate();
    const dateOfQuery = `${currentYear}-${currentMonth}-${currentDate}`;
    const user = req.user;

    if (user !== undefined) {
      return this.ordersService
        .add(user.id, req.body)
        .then((result: any) => {
          return this.itemsService
            .getAllWithFluctuatingPrices(dateOfQuery)
            .then(orderList => {
              return (result[0].entireMenu = orderList);
            })
            .then(finalResult => {
              // broadcast newMenu
              io.emit("action", {
                type: "SOCKET_UPDATE_ITEM_PRICE",
                entireMenu: finalResult
              });

              // broadcast to staff
              // not the best place to put the code but it's here for now
              this.ordersService
                .getAllOrders(user.id)
                .then((allOrders: any) => {
                  io.emit("action", {
                    type: "SOCKET_UPDATE_ORDER_LIST",
                    allOrders
                  });
                });

              res.status(201).json(result);
            });
        })
        .catch((err: express.Errback) => {
          console.log(err);
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
      return res.status(401).json({ status: "unauthorized " });
    }
  }

  public update(req: express.Request, res: express.Response) {
    if (req.user !== undefined) {
      return this.ordersService
        .update(req.params.id, req.body)
        .then((result: any) => {
          return this.ordersService
            .getAllOrders(1)
            .then(orderList => {
              return (result[0].allOrders = orderList);
            })
            .then((finalResult: any) => {
              // broadcast newOrderList
              io.emit("action", {
                type: "SOCKET_UPDATE_ORDER_LIST",
                allOrders: finalResult
              });
              res.status(201).json(result);
            });
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
