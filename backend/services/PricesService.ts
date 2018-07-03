import { Promise as BlueBirdPromise } from "bluebird";
import * as Knex from "knex";
export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 15/06/2018 //
  public async getAll() {
    const categoryList = await this.knex("categories").select(
      "id",
      "categoryName",
      "categoryPhoto"
    );

    const itemList = await BlueBirdPromise.map(
      categoryList,
      async (category: any) => {
        return this.knex("items")
          .select("id as item_id", "minimumPrice", "currentPrice")
          .where("items.categories_id", category.id);
      }
    );

    return categoryList.map((category: any, j: number) => {
      const result = {
        categoryName: category.categoryName,
        categoryPhoto: category.categoryPhoto,
        items: itemList[j]
      };
      return result;
    });
  }

  // Working 15/06/2018 //
  public async getAllByCat(catName: string) {
    const catPhoto = (await this.knex("categories")
      .first()
      .select("categoryPhoto")
      .where("categoryName", catName)).categoryPhoto;

    const catId = await this.knex("categories")
      .first()
      .select("id")
      .where("categoryName", catName);

    const itemList = await this.knex("items")
      .select("id as items_id", "minimumPrice", "currentPrice")
      .where("categories_id", catId.id)
      .orderBy("id", "ase");

    const result = [
      {
        categoryName: catName,
        categoryPhoto: catPhoto,
        items: itemList
      }
    ];
    return result;
  }
}
