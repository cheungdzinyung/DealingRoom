import * as Knex from "knex";

export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  //****TODO*****//
  getAllByCat(req: string) {
    return this.knex("users")
      .select("id")
      .where("id", req);
  }

  //****TODO*****//
  getAll() {
    return this.knex("users")
      .select("id")
      .where("id", 1);
  }

  //****TODO*****//
  update(id: number) {
    return this.knex("users")
      .select("id")
      .where("id", id);
  }
}
