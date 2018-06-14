import * as Knex from "knex";

export default class PricesService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // ****TODO***** //
  public getAllByCat(req: string) {
    return this.knex("users")
      .select("id")
      .where("id", req);
  }

  // ****TODO***** //
  public getAll() {
    return this.knex("users")
      .select("id")
      .where("id", 1);
  }

  // ****TODO***** //
  public update(id: number) {
    return this.knex("users")
      .select("id")
      .where("id", id);
  }
}
