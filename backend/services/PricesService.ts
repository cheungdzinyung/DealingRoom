import * as Knex from "knex";

export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 15/06/2018 //
  public getAll() {
    return this.knex("categories")
      .select("id", "categoryName", "categoryPhoto")
      .then((categoryList: any) => {
        return Promise.all(
          categoryList.map((item: object, i: number) => {
            return this.knex("items")
              .select("id as item_id", "minimumPrice", "currentPrice")
              .where("items.categories_id", categoryList[i].id);
          })
        ).then((itemList: any) => {
          return Promise.all(
            categoryList.map((category: object, j: number) => {
              const result = {
                categoryName: categoryList[j].categoryName,
                categoryPhoto: categoryList[j].categoryPhoto,
                items: itemList[j]
              };
              return result;
            })
          );
        });
      });
  }

  // Working 15/06/2018 //
  public getAllByCat(catName: string) {
    let catPhoto: string;
    // sub-query to obtain the category photo
    this.knex("categories")
      .select("categoryPhoto")
      .where("categoryName", catName)
      .then((photos: Knex.QueryCallback) => {
        return (catPhoto = photos[0].categoryPhoto);
      });

    // obtain the category ID from the category name provided by the request
    return this.knex("categories")
      .select("id")
      .where("categoryName", catName)
      .then((catId: Knex.QueryCallback) => {
        // return a list of items within the category with the item_id, minimumPrice and currentPrice
        return this.knex("items")
          .select("id as item_id", "minimumPrice", "currentPrice")
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
}
