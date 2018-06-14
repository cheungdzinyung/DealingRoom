import * as fs from "fs-extra";
import * as Knex from "knex";

import { IItemData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public saveUpdateItemImage(id: number, file: Express.Multer.File) {
    const imagePath = `./storage/items/${file.originalname}`;
    fs.outputFile(imagePath, file.buffer);
    return this.knex("items")
      .where("id", id)
      .update({
        itemPhoto: imagePath
      });
  }

  // Working 10/06/18
  public add(data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .where("categoryName", data.categoryName)
      .select("id")
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .insert({
            categories_id: catId[0].id,
            currentPrice: data.currentPrice,
            isActive: true,
            isSpecial: data.isSpecial,
            itemDescription: data.itemDescription,
            itemName: data.itemName,
            itemPhoto: data.itemPhoto,
            itemStock: data.itemStock,
            minimumPrice: data.minimumPrice
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
  public get(req: number) {
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
  public getAll() {
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
  public getAllInCat(catName: string) {
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
            "isActive",
            "isSpecial"
          )
          .where("categories_id", catId[0].id)
          .then((itemList: Knex.QueryCallback) => {
            const result = [
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
  public update(id: number, data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .select("id")
      .where("categoryName", data.categoryName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .where("items.id", id)
          .update({
            categories_id: catId[0].id,
            currentPrice: data.currentPrice,
            isActive: data.isActive,
            isSpecial: data.isSpecial,
            itemDescription: data.itemDescription,
            itemName: data.itemName,
            itemPhoto: data.itemPhoto,
            itemStock: data.itemStock,
            minimumPrice: data.minimumPrice
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
