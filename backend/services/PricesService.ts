import * as Knex from "knex";

export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 15/06/2018 //
  public getAllByCat(catName: string) {
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

  // Working 15/06/2018 //
  public getAll() {
    return this.knex("categories")
      .select("id", "categoryName", "categoryPhoto")
      .then(categoryList => {
        return Promise.all(
          categoryList.map((item: object, i: number) => {
            return this.knex("items")
              .select("id as item_id", "minimumPrice", "currentPrice")
              .where("items.categories_id", categoryList[i].id);
          })
        ).then(itemList => {
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

  // ****TODO***** //
  public update(id: number, data: any) {
    return this.knex("items")
      .where("items.id", id)
      .update({
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
  }
}
