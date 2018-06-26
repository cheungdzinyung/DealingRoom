import { Promise as BlueBirdPromise } from "bluebird";
import * as Knex from "knex";
// import { IOrderData } from "../interfaces";

export default class OrdersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 19/06/18
  public async add(id: number, data: any) {
    // insert the order information into the order's table
    const orderId: any = await this.knex("orders")
      .insert({
        isPaid: false,
        status: data.status,
        table: data.table,
        users_id: id
      })
      .returning("id");

    // insert the information of the items within the order into the orders_items table
    const orderItems: any = data.item.map((order: any) => {
      return {
        garnish: order.garnish,
        ice: order.ice,
        items_id: order.items_id,
        orders_id: orderId[0],
        purchasePrice: order.purchasePrice,
        sweetness: order.sweetness
      };
    });

    // obtain each item's id that is being ordered
    const orderItemsIds = await this.knex("orders_items")
      .insert(orderItems)
      .returning("id");

    // loop through each item in the list
    await BlueBirdPromise.map(orderItemsIds, async (item: any) => {
      const orderItemsResult = await this.knex("orders_items")
        .join("items", "items.id", "=", "orders_items.items_id")
        .where("orders_items.id", item)
        .first()
        .select("items.id as items_id", "items.categories_id");

      // define the price up variable
      const priceUp: number = orderItemsResult.categories_id === 1 ? 10 : 10;

      // increase the current price of the item being ordered and obtain the id of the item's price being increased
      const itemIdIncrease = await this.knex("items")
        .update({
          currentPrice: this.knex.raw(`?? + ${priceUp}`, ["currentPrice"])
        })
        .where("id", orderItemsResult.items_id)
        .returning("id");

      // decrease the amount of stock of the item being ordered
      const itemId = await this.knex("items")
        .where("id", itemIdIncrease[0])
        .decrement("itemStock", 1)
        .returning("id");

      // update the current price field in the item's table
      const itemLogPrice = await this.knex("items")
        .select("currentPrice")
        .first()
        .where("id", itemId[0]);

      // update the itemsLogPrice in the itemsLog table
      await this.knex("itemsLog").insert({
        items_id: itemId[0],
        itemsLogPrice: itemLogPrice.currentPrice
      });

      // obtain the category id of the item that had the price increase
      const catId = await this.knex("items")
        .where("id", orderItemsResult.items_id)
        .select("categories_id");

      // define the price down variable
      const priceDown: number =
        catId[0].categories_id === 1 ||
        catId[0].categories_id === 2 ||
        catId[0].categories_id === 12
          ? 10 / 9
          : 10 / 4;

      // decrease the current price of the all other items in the category that has not been ordered obtaining the id of the item's price being decreased
      const itemsIdArray = await this.knex("items")
        .where("categories_id", catId[0].categories_id)
        .whereRaw(`"currentPrice" > "minimumPrice"`)
        .whereNot("id", orderItemsResult.items_id)
        .update({
          currentPrice: this.knex.raw(`?? - ${priceDown}`, ["currentPrice"])
        })
        .returning("id");

      // update the current price of the items' prices that decreased
      const itemsCurrentPrices = await this.knex("items")
        .select("currentPrice", "id")
        .whereIn("id", itemsIdArray);

      // update the items log table with the price decrease
      const itemLogs = itemsCurrentPrices.map((itemLogItem: any) => {
        return {
          items_id: itemLogItem.id,
          itemsLogPrice: itemLogItem.currentPrice
        };
      });
      await this.knex("itemsLog").insert(itemLogs);
    });

    // obtain the summation of purchase price for the order
    const totalPrice = await this.knex("orders_items")
      .sum("purchasePrice")
      .where("orders_id", orderId[0]);

    // update the orderTotal in the orders table with the total price
    await this.knex("orders")
      .update({ orderTotal: totalPrice[0].sum })
      .where("id", orderId[0]);

    // return the user id, order status and order id
    return await this.knex("orders")
      .select("users_id", "status", "id as orders_id")
      .where("id", orderId[0]);
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
  public async getByUser(id: number) {
    // obtain the user name and display name of the user
    const userInfo = await this.knex("users")
      .first()
      .select("username", "displayName")
      .where("id", id);

    // obtain a list of the orders of the user
    const orderList = await this.knex("users")
      .join("orders", "users.id", "=", "users_id")
      .where("users.id", id)
      .select(
        "orders.id as orders_id",
        "orders.table",
        "orders.status",
        "orders.isPaid",
        "orders.created_at as orderingTime"
      )
      .orderBy("orders.id");

    // Loop through each order and obtain the item's information for all the items then appending it on the orderList
    await BlueBirdPromise.map(orderList, async (order: any) => {
      const orderItems = await this.knex("orders")
        .join("orders_items", "orders.id", "=", "orders_items.orders_id")
        .join("items", "items.id", "=", "orders_items.items_id")
        .select(
          "items.itemName",
          "orders_items.items_id",
          "orders_items.ice",
          "orders_items.sweetness",
          "orders_items.garnish",
          "orders_items.purchasePrice"
        )
        .where("orders.id", order.orders_id);
      order.orders = orderItems;
    });

    // combine the information into the agreed upon format and returned
    const entireOrder = [
      {
        users_id: id,
        userName: userInfo.username,
        displayName: userInfo.displayName,
        orders: orderList
      }
    ];
    return entireOrder;
  }

  // Working 15/06/18
  public async getAllPrice(id: number, dateOfQuery: string) {
    // define the max value for the radar graph's use
    const maxValue = await this.knex("orders_items")
      .join("orders", "orders.id", "=", "orders_items.orders_id")
      .first()
      .whereRaw("??::date = ?", ["orders.created_at", dateOfQuery])
      .select(this.knex.raw(`max("orders_items"."purchasePrice")`));

    // obtain the values for the user
    const userResult = await this.knex("categories")
      .join("items", "items.categories_id", "=", "categories.id")
      .join("orders_items", "items.id", "=", "orders_items.items_id")
      .join("orders", "orders.id", "=", "orders_items.orders_id")
      .join("users", "users.id", "=", "orders.users_id")
      .select("categories.categoryName")
      .avg("orders_items.purchasePrice")
      .whereRaw("??::date = ?", ["created_at", dateOfQuery])
      .where("users.id", id)
      .groupBy("categoryName");

    // combine the user's values in the agreed upon format
    const userOrderList = await BlueBirdPromise.map(
      userResult,
      async (order: any) => {
        const obj = {
          category: order.categoryName,
          price: order.avg,
          max: maxValue.max
        };
        return obj;
      }
    );

    // obtain the values for all other users
    const allResult = await this.knex("categories")
      .join("items", "items.categories_id", "=", "categories.id")
      .join("orders_items", "items.id", "=", "orders_items.items_id")
      .join("orders", "orders.id", "=", "orders_items.orders_id")
      .join("users", "users.id", "=", "orders.users_id")
      .select("categories.categoryName")
      .avg("orders_items.purchasePrice")
      .whereRaw("??::date = ?", ["created_at", dateOfQuery])
      .whereNot("users.id", id)
      .groupBy("categoryName");

    // combine all other users' values in the agreed upon format
    const otherOrderList = await BlueBirdPromise.map(
      allResult,
      async (order: any) => {
        const obj = {
          category: order.categoryName,
          price: order.avg,
          max: maxValue.max
        };
        return obj;
      }
    );

    // combine all values in the agreed upon format and return the results
    const finalResult = [
      {
        user: userOrderList,
        all: otherOrderList
      }
    ];
    return finalResult;
  }

  // Working 08/06/18
  public async update(id: number, data: any) {
    const orderId = await this.knex("orders")
      .where("id", id)
      .update({
        isPaid: data.isPaid,
        status: data.status
      })
      .returning("id");

    return this.knex("orders")
      .where("id", orderId[0])
      .select("id as order_id", "status", "isPaid");
  }

  // Working 21/06/18 //
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
            .whereNot(this.knex.raw(`(status='served' AND "isPaid"=true)`))
            .select(
              "orders.id as orders_id",
              "users.id as users_id",
              "users.displayName",
              "orders.table",
              "orders.status",
              "orders.isPaid"
            )
            .orderBy("orders_id")
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
