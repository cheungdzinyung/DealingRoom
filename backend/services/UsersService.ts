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
  public async add(data: IUserData, file: Express.Multer.File) {
    const hash = bcrypt.hashSync(data.password, 10);
    const id = (await this.knex("users")
      .insert({
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        isActive: true,
        password: hash,
        role: data.role,
        username: data.username
      })
      .returning("id"))[0];

    if (file !== undefined) {
      await this.saveUpdateUserImage(id, file);
    }
    return this.knex("users")
      .where("id", id)
      .select("id", "password", "displayName", "userPhoto");
  }

  // Working 06/06/18
  public get(req: number) {
    return this.knex("users")
      .where({ id: req, isActive: true })
      .select("id as users_id", "username", "displayName", "userPhoto", "role");
  }

  // Working 10/06/18
  public async update(id: number, data: IUserData, file: Express.Multer.File) {
    console.log(id)
    console.log(data)

    const hash = bcrypt.hashSync(data.password, 10);
    const userId = (await this.knex("users")
      .where("id", id)
      .update({
        displayName: data.displayName,
        facebookToken: data.facebookToken,
        isActive: data.isActive,
        password: hash,
        role: data.role,
        username: data.username,
        stripeToken: data.stripeToken,
        googleToken: data.googleToken
      })
      .returning("id"))[0];

    if (file !== undefined) {
      await this.saveUpdateUserImage(id, file);
    }
    return this.knex("users")
      .where("id", userId)
      .select("id", "password", "displayName", "userPhoto");
  }
}
