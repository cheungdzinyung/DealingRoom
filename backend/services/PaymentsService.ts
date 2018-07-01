import * as Knex from "knex";

import * as Stripe from "stripe";
const stripe = new Stripe("sk_test_mlmBZyk66UHoOBcCkRKyPdig");

export default class PaymentsService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // TO DO
  public async charge(token: string, orderId: number) {
    if (token === undefined) {
      const userId = await this.knex("orders")
        .select("users_id")
        .where("orders.id", orderId);

      const userToken = await this.knex("users")
        .select("stripeToken")
        .where("id", userId[0].users_id);

      token = userToken[0].stripeToken;
    } else {
      const userId = await this.knex("orders")
        .select("users_id")
        .where("orders.id", orderId);

      await this.knex("users")
        .update("stripeToken", token)
        .where("id", userId[0].users_id);

      const userToken = await this.knex("users")
        .select("stripeToken")
        .where("id", userId[0].users_id);

      token = userToken[0].stripeToken;
    }

    if (token === null) {
      throw new Error("No credit card information in system");
    } else {
      const bill = await this.knex("orders")
        .first()
        .select("id", "orderTotal")
        .where("id", orderId);

      return stripe.charges.create({
        amount: bill.orderTotal * 100,
        currency: "hkd",
        description: "Dealing Room",
        source: token,
        statement_descriptor: `order number: ${bill.id}`
      });
    }
  }
}
