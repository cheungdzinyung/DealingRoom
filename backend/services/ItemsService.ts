import * as Knex from "knex";
import * as fs from "fs-extra";

import { IItemData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  saveUpdateItemImage(id: number, file: Express.Multer.File) {
    const imagePath = `./storage/items/${file.originalname}`;
    fs.outputFile(imagePath, file.buffer);
    return this.knex("items")
      .where("id", id)
      .update({
        itemPhoto: imagePath
      });
  }

  // Working 10/06/18
  add(data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .where("categoryName", data.categoryName)
      .select("id")
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .insert({
            itemName: data.itemName,
            itemStock: data.itemStock,
            categories_id: catId[0].id,
            minimumPrice: data.minimumPrice,
            currentPrice: data.currentPrice,
            itemPhoto: data.itemPhoto,
            itemDescription: data.itemDescription,
            isSpecial: data.isSpecial,
            isActive: true
          })
          .returning("id")
          .then(async (itemId: Knex.QueryCallback) => {
            await this.saveUpdateItemImage(itemId[0], file);
            return this.knex("categories")
              .join("items", "categories.id", "=", "items.categories_id")
              .where("items.id", itemId[0])
              .select(
                "items.id as items_id",
                "items.itemName",
                "items.itemStock",
                "categories.categoryName",
                "items.minimumPrice",
                "items.currentPrice",
                "items.itemPhoto",
                "items.itemDescription",
                "items.isSpecial",
                "items.isActive"
              );
          });
      });
  }

  // Working 06/06/18
  get(req: number) {
    return this.knex("categories")
      .join("items", "categories.id", "=", "items.categories_id")
      .where("items.id", req)
      .select(
        "items.id",
        "items.itemName",
        "items.itemStock",
        "categories.categoryName",
        "items.minimumPrice",
        "items.currentPrice",
        "items.itemPhoto",
        "items.itemDescription",
        "items.isSpecial",
        "items.isActive"
      );
  }

  // Working 06/06/18
  getAll() {
    return this.knex("categories")
      .join("items", "categories.id", "=", "items.categories_id")
      .select(
        "items.id",
        "items.itemName",
        "items.itemStock",
        "categories.categoryName",
        "items.minimumPrice",
        "items.currentPrice",
        "items.itemPhoto",
        "items.itemDescription",
        "items.isSpecial",
        "items.isActive"
      );
  }

  // Working 07/06/18
  getAllInCategory(catName: string) {
    let catPhoto: string;
    this.knex("categories")
      .select("categoryPhoto")
      .where("categoryName", catName)
      .then((photos: Knex.QueryCallback) => {
        return (catPhoto = photos[0].categoryPhoto);
      });
    return this.knex("categories")
      .select("id")
      .where("categoryName", catName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .select(
            "id",
            "itemName",
            "itemStock",
            "minimumPrice",
            "currentPrice",
            "itemPhoto",
            "itemDescription",
            "isActive"
          )
          .where("categories_id", catId[0].id)
          .then((itemList: Knex.QueryCallback) => {
            let result = [
              {
                categoryName: catName,
                categoryPhoto: catPhoto,
                items: itemList
              }
            ];
            return result;
          });
      });
  }

  // Working 10/06/18
  update(id: number, data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .select("id")
      .where("categoryName", data.categoryName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .where("items.id", id)
          .update({
            itemName: data.itemName,
            itemStock: data.itemStock,
            categories_id: catId[0].id,
            minimumPrice: data.minimumPrice,
            currentPrice: data.currentPrice,
            itemPhoto: data.itemPhoto,
            itemDescription: data.itemDescription,
            isSpecial: data.isSpecial,
            isActive: data.isActive
          })
          .returning("id");
      })
      .then(async (itemId: Knex.QueryCallback) => {
        await this.saveUpdateItemImage(itemId[0], file);
        return this.knex("categories")
          .join("items", "categories.id", "=", "items.categories_id")
          .where("items.id", itemId[0])
          .select(
            "items.id",
            "items.itemName",
            "items.itemStock",
            "categories.categoryName",
            "items.minimumPrice",
            "items.currentPrice",
            "items.itemPhoto",
            "items.itemDescription",
            "items.isSpecial",
            "items.isActive"
          );
      });
  }
}
