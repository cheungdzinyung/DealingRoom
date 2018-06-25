import * as express from "express";
import * as multer from "multer";

import OrdersService from "../services/OrdersService";
import PaymentsService from "../services/PaymentsService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../users", storage });

export default class PaymentsRouter {
  private ordersService: OrdersService;
  private paymentsService: PaymentsService;

  constructor(ordersService: OrdersService, paymentsService: PaymentsService) {
    this.ordersService = ordersService;
    this.paymentsService = paymentsService;
  }

  public router() {
    const router = express.Router();

    router.post("/stripe", upload.single(), this.charge.bind(this));

    return router;
  }

  public charge(req: express.Request, res: express.Response) {
    return this.paymentsService
      .charge(req.body.stripeToken, req.body.orderId)
      .then((result: any) => {
        console.log(result);
        console.log(typeof result);
        if (result === Error) {
          throw new Error ("No credit card information in system");
        } else {
          const data = { isPaid: true };
          return this.ordersService
            .update(req.body.orderId, data)
            .then((paymentResult: any) => {
              res.status(201).json(paymentResult);
            })
            .catch((err: express.Errback) => {
              res.status(500).json(err);
            });
        }
      })
      .catch((err: express.Errback) => {
        res.status(500).json(err);
      });
  }
}
