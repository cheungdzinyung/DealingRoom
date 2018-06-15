import * as Knex from "knex";
// import { IOrderData } from "../interfaces";

export default class OrdersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Working 07/06/18
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
        Promise.all(
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
  public getByOrderId(id: number) {
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
            const entireOrder = [
              {
                user_id: order[0].usersId,
                // tslint:disable-next-line:object-literal-sort-keys
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

  // Working 13/06/18
  public getByUserId(id: number) {
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
              for (let i = 0; i < orderList.length; i++) {
                orderList[i].orderItems = orderItems[i];
              }
              const entireOrder = [
                {
                  users_id: id,
                  // tslint:disable-next-line:object-literal-sort-keys
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

  // *****TODO*****//
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
        ).then(userOrderList => {
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
              ).then((otherOrderList)=>{
                const finalResult = [{
                  user: userOrderList,
                  // tslint:disable-next-line:object-literal-sort-keys
                  all: otherOrderList
                }]
                return finalResult;
              })
            });
        });
      });
  }

  // *****TODO******//
  public getAllQuantity(id: number) {
    return this.knex("users")
      .select("id")
      .where("id", id);
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
}

//////// Allen F///////////////
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
