import * as Knex from "knex";
// **** Will use for fileupload ****
// import * as fs from "fs-extra";

import { IItemData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  create(data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .where("categoryName", data.categoryName)
      .select("id")
      .then(catId => {
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
          .then(itemId => {
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
      });
    // **** Need to fix to upload photos ****
    // .then(() => {
    //   fs.writeFile(file.originalname, file.buffer)
    //   .then(fileName => {
    //     console.log("The file name is:", fileName);
    //     return fileName;
    //   })
    // });
  }

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

  update(id: number, data: IItemData) {
    return this.knex("categories")
      .where("categoryName", data.categoryName)
      .returning("id")
      .then(catId => {
        return this.knex("items")
          .where("id", id)
          .update({
            itemName: data.itemName,
            itemStock: data.itemStock,
            categories_id: catId,
            minimumPrice: data.minimumPrice,
            currentPrice: data.currentPrice,
            itemPhoto: data.itemPhoto,
            itemDescription: data.itemDescription,
            isSpecial: data.isSpecial,
            isActive: data.isActive
          })
          .returning("id")
          .then(id => {
            return this.knex("items")
              .where("id", parseInt(id))
              .select(
                "id",
                "itemName",
                "itemStock",
                "categoryName",
                "minimumPrice",
                "currentPrice",
                "itemPhoto",
                "itemDescription",
                "isSpecial",
                "isActive"
              );
          });
      });
  }
}
