import * as Knex from "knex";
// import { IOrderData } from "../interfaces";

export default class OrdersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 07/06/18
  add(id: number, data: any) {
    return this.knex("orders")
      .insert({
        table: data.table,
        status: data.status,
        isPaid: false,
        users_id: id
      })
      .returning("id")
      .then((orderId: Knex.QueryCallback) => {
        Promise.all(
          data.item.map((item: object, i: number) => {
            return this.knex("items")
              .select("id")
              .where("itemName", data.item[i].itemName)
              .then((itemId: object) => {
                return this.knex("orders_items").insert({
                  orders_id: orderId[0],
                  items_id: itemId[0].id,
                  purchasePrice: data.item[i].purchasePrice,
                  ice: data.item[i].ice,
                  sweetness: data.item[i].sweetness,
                  garnish: data.item[i].garnish
                });
              });
          })
        );
        return orderId;
      })
      .then((orderId: Knex.QueryCallback) => {
        return this.knex("orders")
          .select("users_id", "status", "id as orders_id")
          .where("id", orderId[0]);
      });
  }

  // Working 07/06/18
  getByOrderId(id: number) {
    return this.knex("users")
      .join("orders", "users.id", "=", "users_id")
      .where("orders.id", id)
      .select(
        "users.id as usersId",
        "users.username",
        "users.displayName",
        "orders.id",
        "orders.table",
        "orders.status",
        "orders.isPaid",
        "orders.created_at as orderingTime"
      )
      .then((order: Knex.QueryCallback) => {
        return this.knex("orders_items")
          .join("orders", "orders.id", "=", "orders_items.orders_id")
          .join("items", "items.id", "=", "orders_items.items_id")
          .select(
            "items.id as item_id",
            "items.itemName as itemName",
            "orders_items.purchasePrice as purchasePrice",
            "orders_items.ice as ice",
            "orders_items.sweetness as sweetness",
            "orders_items.garnish as garnish"
          )
          .where("orders.id", id)
          .then((orderItemsList: Knex.QueryCallback) => {
            let entireOrder = [
              {
                user_id: order[0].usersId,
                userName: order[0].username,
                displayName: order[0].displayName,
                orders_id: order[0].id,
                table: order[0].table,
                status: order[0].status,
                isPaid: order[0].isPaid,
                orderingTime: order[0].orderingTime,
                orderItems: orderItemsList
              }
            ];
            return entireOrder;
          });
      });
  }

  //*****TODO*****// 10/06/18
  getByUserId(id: number) {
    return this.knex("users")
      .select("username", "displayName")
      .where("id", id)
      .then((userInfo: any) => {
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
              for (var i = 0; i < orderList.length; i++) {
                orderList[i].orderItems = orderItems[i];
              }
              let entireOrder = [
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
      

    ////////Allen F///////////////
    // async getOrderByUserId(id: number) {
    //   let [user] = await this.knex("users")
    //     .where("id", id)
    //     .select("users.id as user_id", "username", "displayName"); // user should be first element of array (Destructuring_assignment)

    //   const orderList = await this.knex("orders")
    //     .where("users_id", id)
    //     .select("id");

    //   const orders = await Promise.all(
    //     orderList.map(async (_order: object, i: number) => {
    //       console.log(orderList[i].id);
    //       let [order] = await this.getOrderByOrderId(id);
    //       delete order.user_id;
    //       delete order.userName;
    //       delete order.displayName;
    //       return order;
    //     })
    //   );
    //   user["orders"] = orders;
    //   return user;
  }

  //*****TODO*****//
  getAllPrice(id: number) {
    return this.knex("orders")
      .join("users", "users.id", "=", "orders.users_id")
      .join("orders_items", "orders_items.orders_id", "=", "orders.id")
      .join("items", "items.id", "=", "orders_items.items_id")
      .join("categories", "categories.id", "=", "items.categories_id")
      .select("categories.categoryName")
      .sumDistinct("orders_items.purchasePrice")
      .whereNot("users.id", id)
      .groupBy("categories.categoryName")
      .then(result => {
        let obj = {
          [result.categoryName]: [result.sum]
        };
        console.log(obj);
        return obj;

        // Promise.all(
        //   result
        //     .map((category: any, i: number) => {
        //       let sum = result[i].sum;
        //       let obj = {
        //         [result[i].categoryName]: sum
        //       };
        //       return obj;
        //     })
        //     .then((results: any) => {
        //       return results;
        //     })
        // );
      });
  }

  //*****TODO******//
  getAllQuantity(id: number) {
    return this.knex("users")
      .select("id")
      .where("id", id);
  }

  // Working 08/06/18
  update(id: number, data: any) {
    return this.knex("orders")
      .where("id", id)
      .update({
        status: data.status,
        isPaid: data.isPaid
      })
      .returning("id")
      .then((id: number) => {
        return this.knex("orders")
          .where("id", id[0])
          .select("id as order_id", "status", "isPaid");
      });
  }
}
