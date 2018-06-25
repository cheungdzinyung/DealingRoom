import * as express from "express";
import * as Knex from "knex";
import * as multer from "multer";

import OrdersService from "../services/OrdersService";
import PaymentsService from "../services/PaymentsService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage });

export default class PaymentsRouter {
  private knex: Knex;
  private ordersService: OrdersService;
  private paymentsService: PaymentsService;

  constructor(
    knex: Knex,
    ordersService: OrdersService,
    paymentsService: PaymentsService
  ) {
    this.knex = knex;
    this.ordersService = ordersService;
    this.paymentsService = paymentsService;
  }

  public router() {
    const router = express.Router();

    router.post("/stripe", upload.single(), this.charge.bind(this));

    return router;
  }

  public charge(req: express.Request, res: express.Response) {
    const tokenCheck = this.knex("users")
      .join("orders", "orders.users_id", "=", "users.id")
      .select("stripeToken")
      .where("orders.id", req.body.orderId);
    console.log(tokenCheck);

    return this.paymentsService
      .charge(req.body.stripeToken, req.body.orderId)
      .then((result: any) => {
        const data = { isPaid: true };
        return this.ordersService
          .update(req.body.orderId, data)
          .then((paymentResult: any) => {
            res.status(201).json(paymentResult);
          })
          .catch((err: express.Errback) => {
            res.status(500).json(err);
          });
      })
      .catch((err: express.Errback) => {
        res.status(500).json(err);
      });
  }
}
