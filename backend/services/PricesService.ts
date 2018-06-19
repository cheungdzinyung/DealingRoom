import * as Knex from "knex";

export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
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

  // Working 19-06-2018 //
  public add(id: number, data: any) {
    // insert the order information into the order's table
    return this.knex("orders")
      .insert({
        isPaid: false,
        status: data.status,
        table: data.table,
        users_id: id
      })
      .returning("id")
      .then((orderId: Knex.QueryCallback) => {
        // insert the information of the items within the order into the orders_items table
        return Promise.all(
          data.item.map((order: object, i: number) => {
            return this.knex("orders_items")
              .insert({
                garnish: data.item[i].garnish,
                ice: data.item[i].ice,
                items_id: data.item[i].items_id,
                orders_id: orderId[0],
                purchasePrice: data.item[i].purchasePrice,
                sweetness: data.item[i].sweetness
              })
              .returning("id");
          })
        ).then((orderItemId: any) => {
          Promise.all(
            orderItemId.map((item: object, j: number) => {
              // obtain the each item's id that is being ordered
              return this.knex("orders_items")
                .join("items", "items.id", "=", "orders_items.items_id")
                .where("orders_items.id", orderItemId[j][0])
                .select("items.id as items_id")
                .then(itemIdIncrease => {
                  // increase the current price of the item being ordered
                  return this.knex("items")
                    .where("id", itemIdIncrease[0].items_id)
                    .increment("currentPrice", 1)
                    .returning("id")
                    .then(itemIdDecrease => {
                      // decrease the itemStock of the item being ordered
                      return this.knex("items")
                        .where("id", itemIdDecrease[0])
                        .decrement("itemStock", 1)
                        .returning("id")
                        .then(itemId => {
                          // obtain the current price from the item's table
                          return this.knex("items")
                            .select("currentPrice")
                            .where("id", itemId[0])
                            .then(itemLogPrice => {
                              // insert the current price into the itemsLog as itemsLogPrice
                              return this.knex("itemsLog")
                                .insert({
                                  items_id: itemId[0],
                                  itemsLogPrice: itemLogPrice[0].currentPrice
                                })
                                .then(() => {
                                  // check for the category of the item that had its current price increased
                                  return this.knex("items")
                                    .where("id", itemIdIncrease[0].items_id)
                                    .select("categories_id")
                                    .then(catId => {
                                      // decrease all other items current price in the specific category other than the item being ordered
                                      return (
                                        this.knex("items")
                                          .where(
                                            "categories_id",
                                            catId[0].categories_id
                                          )
                                          .whereRaw(`"currentPrice" > "minimumPrice"`)
                                          .whereNot(
                                            "id",
                                            itemIdIncrease[0].items_id
                                          )
                                          .decrement("currentPrice", 1)
                                          .returning("id")
                                          .then(itemsIdArray => {
                                            // obtain the current price of the other items in the category from the item's table
                                            itemsIdArray.map(
                                              (items: object, k: number) => {
                                                return this.knex("items")
                                                  .select("currentPrice")
                                                  .where("id", itemsIdArray[k])
                                                  .then(itemsLogPrice => {
                                                    // insert the current price into the itemsLog as itemsLogPrice
                                                    return this.knex(
                                                      "itemsLog"
                                                    ).insert({
                                                      items_id: itemsIdArray[k],
                                                      itemsLogPrice:
                                                        itemsLogPrice[0]
                                                          .currentPrice
                                                    });
                                                  });
                                              }
                                            );
                                          })
                                      );
                                    });
                                });
                            });
                        });
                    });
                });
            })
          );
          // return the user_id, order status and order_id of the added order
          return this.knex("orders")
            .select("users_id", "status", "id as orders_id")
            .where("id", orderId[0]);
        });
      });
  }

  public update(data: any) {
    return data;
  }
}
