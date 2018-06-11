import * as Knex from "knex";
import * as fs from "fs-extra";

import { IUserData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  saveUpdateUserImage(id: number, file: Express.Multer.File) {
    const imagePath = `./storage/users/${id}/profile.jpg`;
    fs.outputFile(imagePath, file.buffer);
    return this.knex("users")
      .where("id", id)
      .update({
        userPhoto: imagePath
      });
  }

  // Working 10/06/18
  add(data: IUserData, file: Express.Multer.File) {
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
      .then(async (id: Knex.QueryCallback) => {
        await this.saveUpdateUserImage(id[0], file);
        return this.knex("users")
          .where("id", id[0])
          .select("id as user_id", "displayName", "userPhoto");
      });
  }

  // Working 06/06/18
  get(req: number) {
    return this.knex("users")
      .where({ id: req, isActive: true })
      .select("username", "password", "displayName", "userPhoto", "role");
  }

  // Working 10/06/18
  update(id: number, data: IUserData, file: Express.Multer.File) {
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
      .then(async (id: Knex.QueryCallback) => {
        await this.saveUpdateUserImage(id[0], file);
        return this.knex("users")
          .where("id", id[0])
          .select("displayName", "userPhoto");
      });
  }
}
