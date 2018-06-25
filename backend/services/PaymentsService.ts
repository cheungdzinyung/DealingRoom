import * as Knex from "knex";

import * as Stripe from "stripe";
const stripe = new Stripe("sk_test_mlmBZyk66UHoOBcCkRKyPdig");

export default class PaymentsService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // TO DO
  public charge(token: string, orderId: number) {
    console.log(token);
    return this.knex("orders")
      .select("id", "orderTotal")
      .where("id", orderId)
      .then((bill: any) => {
        return stripe.charges.create({
          amount: bill[0].orderTotal * 100,
          currency: "hkd",
          description: "Dealing Room",
          source: token,
          statement_descriptor: `order number: ${bill[0].id}`
        });
      });
  }
}
