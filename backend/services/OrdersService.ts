import * as Knex from "knex";

// import { IOrderData } from "../interfaces";

export default class OrdersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // can only insert one item per order currently
  // 07-06-18
  create(id: number, data: any) {
    return this.knex("orders")
      .insert({
        table: data.table,
        status: data.status,
        isPaid: false,
        users_id: id
      })
      .returning("id")
      .then((orderId: Object) => {
        return this.knex("items")
          .select("id")
          .where("itemName", data.item[0].itemName)
          .then((itemId: Object) => {
            return (
              this.knex("orders_items")
                //***TO DO****/
                //Need to be able to insert multiple items
                .insert({
                  orders_id: orderId[0],
                  items_id: itemId[0].id,
                  purchasePrice: data.item[0].purchasePrice,
                  ice: data.item[0].ice,
                  sweetness: data.item[0].sweetness,
                  garnish: data.item[0].garnish
                })
                .then(() => {
                  return this.knex("orders")
                    .select("users_id", "status", "id as orders_id")
                    .where("id", orderId[0]);
                })
            );
          });
      });
  }
  
  // able to get all items within array but unable to insert into result object
  // 07-06-18
  getOrderByOrderId(req: number) {
    let orderItemsList = this.knex("orders_items")
      .join("orders", "orders.id", "=", "orders_items.orders_id")
      .join("items", "items.id", "=", "orders_items.items_id")
      .select(
        "items.itemName as itemName",
        "orders_items.purchasePrice as purchasePrice",
        "orders_items.ice as ice",
        "orders_items.sweetness as sweetness",
        "orders_items.garnish as garnish"
      )
      .where("orders.id", req);

    return this.knex("users")
      .join("orders", "users.id", "=", "users_id")
      .where("orders.id", req)
      .select(
        "users.id as usersId",
        "users.username",
        "users.displayName",
        "orders.id",
        "orders.table",
        "orders.status",
        "orders.isPaid"
      )
      .then((order: Object) => {
        let entireOrder = [
          {
            user_id: order[0].usersId,
            userName: order[0].username,
            displayName: order[0].displayName,
            orders_id: order[0].id,
            table: order[0].table,
            status: order[0].status,
            isPaid: order[0].isPaid,
            orderItems: orderItemsList
          }
        ];
        return entireOrder;
      });
  }

  // update(id: number, data: IOrderData) {
  //   return this.knex("users")
  //     .where("id", id)
  //     .update({
  //       table: data.table
  //     })
  //     .returning("id")
  //     .then(id => {
  //       return this.knex("users")
  //         .where("id", parseInt(id))
  //         .select("displayName", "userPhoto");
  //     });
  // }
}
