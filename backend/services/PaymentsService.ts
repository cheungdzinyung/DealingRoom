import * as Knex from "knex";

export default class PaymentsService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // TO DO
  public add(data: any) {
    return this.knex("users");
  }

  // TO DO
  public get(id: number) {
    return this.knex("users");
  }
}
