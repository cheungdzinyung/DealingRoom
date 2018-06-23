import * as bcrypt from "bcrypt";
import * as fs from "fs-extra";
import * as Knex from "knex";

import { IUserData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public saveUpdateUserImage(id: number, file: Express.Multer.File) {
    const imagePath = `./storage/users/${id}/profile.jpg`;
    fs.outputFile(imagePath, file.buffer);
    return this.knex("users")
      .where("id", id)
      .update({
        userPhoto: imagePath
      });
  }

  // Working 10/06/18
  public add(data: IUserData, file: Express.Multer.File) {
    const hash = bcrypt.hashSync(data.password, 10);
    return this.knex("users")
      .insert({
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        isActive: true,
        password: hash,
        role: data.role,
        username: data.username
      })
      .returning("id")
      .then(async (id: Knex.QueryCallback) => {
        if (file !== undefined) {
          await this.saveUpdateUserImage(id[0], file);
        }
        return this.knex("users")
          .where("id", id[0])
          .select("id", "password", "displayName", "userPhoto");
      });
  }

  // Working 06/06/18
  public get(req: number) {
    return this.knex("users")
      .where({ id: req, isActive: true })
      .select("id as users_id", "username", "displayName", "userPhoto", "role");
  }

  // Working 10/06/18
  public update(id: number, data: IUserData, file: Express.Multer.File) {
    const hash = bcrypt.hashSync(data.password, 10);
    return this.knex("users")
      .where("id", id)
      .update({
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        isActive: data.isActive,
        password: hash,
        role: data.role,
        username: data.username
      })
      .returning("id")
      .then(async (userId: Knex.QueryCallback) => {
        if (file !== undefined) {
          await this.saveUpdateUserImage(id[0], file);
        }
        return this.knex("users")
          .where("id", userId[0])
          .select("displayName", "userPhoto");
      });
  }
}
