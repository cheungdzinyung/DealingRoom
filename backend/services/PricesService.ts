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
  public add(id: number, data: any) {
    return this.knex("orders")
      .insert({
        isPaid: false,
        status: data.status,
        table: data.table,
        users_id: id
      })
      .returning("id")
      .then((orderId: Knex.QueryCallback) => {
        return Promise.all(
          data.item.map((item: object, i: number) => {
            return this.knex("orders_items").insert({
              garnish: data.item[i].garnish,
              ice: data.item[i].ice,
              items_id: data.item[i].items_id,
              orders_id: orderId[0],
              purchasePrice: data.item[i].purchasePrice,
              sweetness: data.item[i].sweetness
            });
          })
        )
          .then(() => {
            return this.knex("orders")
              .join("orders_items", "orders.id", "=", "orders_items.orders_id")
              .join("items", "items.id", "=", "orders_items.items_id")
              .select("items.id")
              .where("orders.id", orderId[0]);
          })
          .then(orderListId => {
            return Promise.all(
              orderListId.map((order: object, j: number) => {
                return this.knex("items")
                  .where("id", orderListId[j].id)
                  .increment("currentPrice", 1)
                  .select("categories_id");
              })
            ).then(() => {
              return Promise.all(
                orderListId.map((order: object, i: number) => {
                  return this.knex("items")
                    .select("categories_id")
                    .where("id", orderListId[i].id)
                    .then(catIdList => {
                      catIdList.map((cat: object, j: number) => {
                        return this.knex("items")
                        .whereNot("id", orderListId[j].id)
                        .decrement("currentPrice", 1);
                        // console.log(catIdList[0].categories_id);
                      });
                      return catIdList[0];
                    });
                })
              );
            });
          });
      });
  }

  public update(data: any) {
    return data;
  }
}
