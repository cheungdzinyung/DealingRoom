import * as Knex from "knex";
// import { IOrderData } from "../interfaces";
// import { io } from "../app";

export default class OrdersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 19/06/18
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
      .then((orderId: any) => {
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
          return Promise.all(
            orderItemId.map((item: object, j: number) => {
              // obtain the each item's id that is being ordered
              return this.knex("orders_items")
                .join("items", "items.id", "=", "orders_items.items_id")
                .where("orders_items.id", orderItemId[j][0])
                .select("items.id as items_id")
                .then((itemIdIncrease: Knex.QueryBuilder) => {
                  // increase the current price of the item being ordered
                  return this.knex("items")
                    .where("id", itemIdIncrease[0].items_id)
                    .increment("currentPrice", 1)
                    .returning("id")
                    .then((itemIdDecrease: Knex.QueryBuilder) => {
                      // decrease the itemStock of the item being ordered
                      return this.knex("items")
                        .where("id", itemIdDecrease[0])
                        .decrement("itemStock", 1)
                        .returning("id")
                        .then((itemId: Knex.QueryBuilder) => {
                          // obtain the current price from the item's table
                          return this.knex("items")
                            .select("currentPrice")
                            .where("id", itemId[0])
                            .then((itemLogPrice: Knex.QueryBuilder) => {
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
                                    .then((catId: Knex.QueryBuilder) => {
                                      // decrease all other items current price in the specific category other than the item being ordered
                                      return this.knex("items")
                                        .where(
                                          "categories_id",
                                          catId[0].categories_id
                                        )
                                        .whereRaw(
                                          `"currentPrice" > "minimumPrice"`
                                        )
                                        .whereNot(
                                          "id",
                                          itemIdIncrease[0].items_id
                                        )
                                        .decrement("currentPrice", 1)
                                        .returning("id")
                                        .then((itemsIdArray: any) => {
                                          // obtain the current price of the other items in the category from the item's table
                                          itemsIdArray.map(
                                            (items: object, k: number) => {
                                              return this.knex("items")
                                                .select("currentPrice")
                                                .where("id", itemsIdArray[k])
                                                .then(
                                                  (
                                                    itemsLogPrice: Knex.QueryBuilder
                                                  ) => {
                                                    // insert the current price into the itemsLog as itemsLogPrice
                                                    return this.knex(
                                                      "itemsLog"
                                                    ).insert({
                                                      items_id: itemsIdArray[k],
                                                      itemsLogPrice:
                                                        itemsLogPrice[0]
                                                          .currentPrice
                                                    });
                                                  }
                                                );
                                            }
                                          );
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
          ).then(() => {
            // return the user_id, order status and order_id of the added order
            return this.knex("orders")
              .select("users_id", "status", "id as orders_id")
              .where("id", orderId[0]);
          });
        });
        // .then((confirmedOrder: any) => {
        //   return this.knex("categories")
        //     .select("id", "categoryName", "categoryPhoto")
        //     .then(categoryList => {
        //       return Promise.all(
        //         categoryList.map((item: object, i: number) => {
        //           return this.knex("items")
        //             .select(
        //               "id as items_id",
        //               "itemName",
        //               "itemStock",
        //               "minimumPrice",
        //               "currentPrice",
        //               "itemPhoto",
        //               "itemDescription",
        //               "isSpecial",
        //               "isActive"
        //             )
        //             .where("items.categories_id", categoryList[i].id);
        //         })
        //       )
        //         .then(itemList => {
        //           return Promise.all(
        //             categoryList.map((category: object, j: number) => {
        //               const result = {
        //                 categoryName: categoryList[j].categoryName,
        //                 categoryPhoto: categoryList[j].categoryPhoto,
        //                 items: itemList[j]
        //               };
        //               return result;
        //             })
        //           );
        //         })
        //         .then((entireMenu: any) => {
        //           // broadcast newMenu
        //           console.log(entireMenu);
        //           io.local.emit("action", {
        //             type: "SOCKET_UPDATE_ITEM_PRICE",
        //             entireMenu
        //           });
        //           // vvv old price, what's wrong?
        //           return { ...confirmedOrder[0], entireMenu };
        //         });
        //     });
        // });
      });
  }

  // Working 07/06/18
  // public getByOrderId(id: number) {
  //   return this.knex("users")
  //     .join("orders", "users.id", "=", "users_id")
  //     .where("orders.id", id)
  //     .select(
  //       "users.id as usersId",
  //       "users.username",
  //       "users.displayName",
  //       "orders.id",
  //       "orders.table",
  //       "orders.status",
  //       "orders.isPaid",
  //       "orders.created_at as orderingTime"
  //     )
  //     .then((order: Knex.QueryCallback) => {
  //       return this.knex("orders_items")
  //         .join("orders", "orders.id", "=", "orders_items.orders_id")
  //         .join("items", "items.id", "=", "orders_items.items_id")
  //         .select(
  //           "items.id as item_id",
  //           "items.itemName as itemName",
  //           "orders_items.purchasePrice as purchasePrice",
  //           "orders_items.ice as ice",
  //           "orders_items.sweetness as sweetness",
  //           "orders_items.garnish as garnish"
  //         )
  //         .where("orders.id", id)
  //         .then((orderItemsList: Knex.QueryCallback) => {
  //           const entireOrder = [
  //             {
  //               user_id: order[0].usersId,
  //               // tslint:disable-next-line:object-literal-sort-keys
  //               userName: order[0].username,
  //               displayName: order[0].displayName,
  //               orders_id: order[0].id,
  //               table: order[0].table,
  //               status: order[0].status,
  //               isPaid: order[0].isPaid,
  //               orderingTime: order[0].orderingTime,
  //               orderItems: orderItemsList
  //             }
  //           ];
  //           return entireOrder;
  //         });
  //     });
  // }

  // Working 13/06/18
  public getByUser(id: number) {
    return this.knex("users")
      .select("username", "displayName")
      .where("id", id)
      .then((userInfo: Knex.QueryBuilder) => {
        return this.knex("users")
          .join("orders", "users.id", "=", "users_id")
          .where("users.id", id)
          .select(
            "orders.id as orders_id",
            "orders.table",
            "orders.status",
            "orders.isPaid",
            "orders.created_at as orderingTime"
          )
          .then((orderList: any) => {
            return Promise.all(
              orderList.map((item: object, i: number) => {
                return this.knex("orders")
                  .join(
                    "orders_items",
                    "orders.id",
                    "=",
                    "orders_items.orders_id"
                  )
                  .join("items", "items.id", "=", "orders_items.items_id")
                  .select(
                    "items.itemName",
                    "orders_items.items_id",
                    "orders_items.ice",
                    "orders_items.sweetness",
                    "orders_items.garnish",
                    "orders_items.purchasePrice"
                  )
                  .where("orders.id", orderList[i].orders_id);
              })
            ).then((orderItems: any) => {
              for (let i = 0; i < orderList.length; i++) {
                orderList[i].orderItems = orderItems[i];
              }
              const entireOrder = [
                {
                  users_id: id,
                  userName: userInfo[0].username,
                  displayName: userInfo[0].displayName,
                  orders: orderList
                }
              ];
              return entireOrder;
            });
          });
      });
  }

  // Working 15-06-2018//
  public getAllPrice(id: number, dateOfQuery: string) {
    return this.knex("categories")
      .join("items", "items.categories_id", "=", "categories.id")
      .join("orders_items", "items.id", "=", "orders_items.items_id")
      .join("orders", "orders.id", "=", "orders_items.orders_id")
      .join("users", "users.id", "=", "orders.users_id")
      .select("categories.categoryName")
      .avg("orders_items.purchasePrice")
      .whereRaw("??::date = ?", ["created_at", dateOfQuery])
      .where("users.id", id)
      .groupBy("categoryName")
      .then((result: any) => {
        return Promise.all(
          result.map((order: object, i: number) => {
            const obj = {
              [result[i].categoryName]: result[i].avg
            };
            return obj;
          })
        ).then((userOrderList: any) => {
          return this.knex("categories")
            .join("items", "items.categories_id", "=", "categories.id")
            .join("orders_items", "items.id", "=", "orders_items.items_id")
            .join("orders", "orders.id", "=", "orders_items.orders_id")
            .join("users", "users.id", "=", "orders.users_id")
            .select("categories.categoryName")
            .avg("orders_items.purchasePrice")
            .whereRaw("??::date = ?", ["created_at", dateOfQuery])
            .whereNot("users.id", id)
            .groupBy("categoryName")
            .then((result2: any) => {
              return Promise.all(
                result2.map((order: object, i: number) => {
                  const obj = {
                    [result2[i].categoryName]: result2[i].avg
                  };
                  return obj;
                })
              ).then(otherOrderList => {
                const finalResult = [
                  {
                    user: userOrderList,
                    all: otherOrderList
                  }
                ];
                return finalResult;
              });
            });
        });
      });
  }

  // Working 08/06/18
  public update(id: number, data: any) {
    return this.knex("orders")
      .where("id", id)
      .update({
        isPaid: data.isPaid,
        status: data.status
      })
      .returning("id")
      .then((orderId: number) => {
        return this.knex("orders")
          .where("id", orderId[0])
          .select("id as order_id", "status", "isPaid");
      });
  }

  // TODO //
  public getAllOrders(id: number) {
    return this.knex("users")
      .select("role")
      .where("id", id)
      .then(userRole => {
        if (
          userRole[0].role === "manager" ||
          userRole[0].role === "bartender" ||
          userRole[0].role === "server"
        ) {
          return this.knex("orders")
            .join("users", "users.id", "=", "orders.users_id")
            .whereNot({ status: "served", isPaid: true })
            .select(
              "orders.id as orders_id",
              "users.id as users_id",
              "users.displayName",
              "orders.table",
              "orders.status",
              "orders.isPaid"
            )
            .then(ordersList => {
              return Promise.all(
                ordersList.map((order: object, i: number) => {
                  return this.knex("orders")
                    .join(
                      "orders_items",
                      "orders_items.orders_id",
                      "=",
                      "orders.id"
                    )
                    .join("items", "items.id", "=", "orders_items.items_id")
                    .select(
                      "items.itemName",
                      "orders_items.ice",
                      "orders_items.sweetness",
                      "orders_items.garnish",
                      "orders_items.purchasePrice"
                    )
                    .where("orders.id", ordersList[i].orders_id);
                })
              ).then(itemsList => {
                return Promise.all(
                  ordersList.map((category: object, j: number) => {
                    const result = {
                      orders_id: ordersList[j].orders_id,
                      users_id: ordersList[j].users_id,
                      displayName: ordersList[j].displayName,
                      table: ordersList[j].table,
                      status: ordersList[j].status,
                      isPaid: ordersList[j].isPaid,
                      order: itemsList[j]
                    };
                    return result;
                  })
                );
              });
            });
        } else {
          return userRole[0].role;
        }
      });
  }
}
