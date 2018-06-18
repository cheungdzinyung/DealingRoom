import * as express from "express";
import * as multer from "multer";

import { IItemData } from "../interfaces";
import ItemsService from "../services/ItemsService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../storage/items", storage });

export default class ItemsRouter {
  private itemsService: ItemsService;

  constructor(itemsService: ItemsService) {
    this.itemsService = itemsService;
  }

  public router() {
    const router = express.Router();

    router.post("/", upload.single("itemPhoto"), this.add.bind(this));

    router.get("/:id", this.get.bind(this));
    router.get("/", this.getAll.bind(this));

    router.put("/:id", upload.single("itemPhoto"), this.update.bind(this));

    return router;
  }

  public add(req: express.Request, res: express.Response) {
    return this.itemsService
      .add(req.body, req.file)
      .then((result: IItemData) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public get(req: express.Request, res: express.Response) {
    return this.itemsService
      .get(req.params.id)
      .then((result: IItemData) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }

  public getAll(req: express.Request, res: express.Response) {
    if (req.query.category !== undefined) {
      if (req.query.fluctuatingPrices !== undefined) {
        return this.itemsService
          .getAllInCatWithFluctuatingPrices(req.query.category, req.query.fluctuatingPrices)
          .then((result: any) => {
            res.status(200).json(result);
          })
          .catch((err: express.Errback) => {
            res.status(500).json({ status: "failed" });
          });
      } else {
        return this.itemsService
          .getAllInCat(req.query.category)
          .then((result: any) => {
            res.status(200).json(result);
          })
          .catch((err: express.Errback) => {
            res.status(500).json({ status: "failed" });
          });
      }
    } else {
      if (req.query.fluctuatingPrices !== undefined) {
        return this.itemsService
          .getAllWithFluctuatingPrices(req.query.fluctuatingPrices)
          .then((result: any) => {
            res.status(200).json(result);
          })
          .catch((err: express.Errback) => {
            res.status(500).json({ status: "failed" });
          });
      }else{
        return this.itemsService
        .getAll()
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          res.status(500).json({ status: "failed" });
        });
      }
    }
  }

  public update(req: express.Request, res: express.Response) {
    return this.itemsService
      .update(req.params.id, req.body, req.file)
      .then((result: IItemData) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        res.status(500).json({ status: "failed" });
      });
  }
}
