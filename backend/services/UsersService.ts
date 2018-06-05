import * as express from "express";
import * as Knex from "knex";
import * as fs from "fs-extra";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  create(data: any,  file: any) {
    return this.knex("users")
      .insert({
        username: data.username,
        passwordHash: data.password,
        displayName: data.displayName,
        role: data.role,
        isActive: true
      })
      .returning("id")
      .then(id => {
        return this.knex("users")
          .where("id", parseInt(id))
          .select("id");
      })
      .then(() => {
        fs.writeFile(file.originalname, file.buffer)
        .then(fileName => {
          console.log("The file name is:", fileName);
          return fileName;
        })
      });
  }
}
