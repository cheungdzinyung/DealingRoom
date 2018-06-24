import * as express from "express";
import * as multer from "multer";

import PaymentsService from "../services/PaymentsService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../storage/items", storage });

export default class PaymentsRouter {
  private paymentsService: PaymentsService;

  constructor(paymentsService: PaymentsService) {
    this.paymentsService = paymentsService;
  }

  public router() {
    const router = express.Router();

    router.post("/", upload.single("itemPhoto"), this.add.bind(this));

    router.get("/:id", this.get.bind(this));

    return router;
  }

  public add(req: express.Request, res: express.Response) {
    return this.paymentsService
      .add(req.body)
      .then((result: any) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public get(req: express.Request, res: express.Response) {
    return this.paymentsService
      .get(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }
}
