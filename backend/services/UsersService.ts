import * as Knex from "knex";
// import * as fs from "fs-extra";

import { IUserData } from "../interfaces"

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  create(data: IUserData, file: any) {
    return this.knex("users")
      .insert({
        username: data.username,
        password: data.password,
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        role: data.role,
        isActive: true
      })
      .returning("id")
      .then(id => {
        return this.knex("users")
          .where("id", parseInt(id))
          .select("id", "displayName", "userPhoto");
      });
    // .then(() => {
    //   fs.writeFile(file.originalname, file.buffer)
    //   .then(fileName => {
    //     console.log("The file name is:", fileName);
    //     return fileName;
    //   })
    // });
  }

  get(req: number) {
    return this.knex("users")
      .where({ id: req, isActive: true })
      .select("username", "password", "displayName", "userPhoto", "role");
  }

  update(id: number, data: IUserData) {
    return this.knex("users")
      .where("id", id)
      .update({
        username: data.username,
        password: data.password,
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        role: data.role,
        isActive: data.isActive
      })
      .returning("id")
      .then(id => {
        return this.knex("users")
          .where("id", parseInt(id))
          .select("displayName", "userPhoto");
      });
  }
}
