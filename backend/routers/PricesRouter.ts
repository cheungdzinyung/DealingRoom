import * as express from "express";

import PricesService from "../services/PricesService";

export default class PricesRouter {
  private pricesService: PricesService;

  constructor(pricesService: PricesService) {
    this.pricesService = pricesService;
  }

  router() {
    let router = express.Router();

    router.get("/", this.getAll.bind(this));
 
    router.put("/:id", this.update.bind(this));
    
    return router;
  }

  getAll(req: express.Request, res: express.Response) {
    if (req.query.category !== undefined) {
      return this.pricesService
        .getAllByCat(req.query)
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          console.log("Post Error", err);
          res.status(500).json({ status: "failed" });
        });
    } else {
      return this.pricesService
        .getAll()
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          console.log("Post Error", err);
          res.status(500).json({ status: "failed" });
        });
    }
  }

  update(req: express.Request, res: express.Response) {
    return this.pricesService
    .update(req.params.id)
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((err: express.Errback) => {
      console.log("Post Error", err);
      res.status(500).json({ status: "failed" });
    });
  }
}
