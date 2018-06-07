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
                    .select("users_id", "status", "id")
                    .where("id", orderId[0]);
                })
            );
          });
      });
  }

  getOrderByOrderId(req: number) {
    console.log(req);

    return this.knex("users")
      .join("orders", "users.id", "=", "users_id")
      .where("orders.id", req)
      .select(
        "users.id",
        "users.username as username",
        "users.displayName as displayName",
        "orders.id",
        "orders.table as table",
        "orders.status as status",
        "orders.isPaid as isPaid",
      );
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
