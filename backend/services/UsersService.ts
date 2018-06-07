import * as Knex from "knex";
// **** Will use for file upload ****
// import * as fs from "fs-extra";

import { IUserData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  create(data: IUserData, file: Express.Multer.File) {
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
      .then((id: Object) => {
        return this.knex("users")
          .where("id", id[0])
          .select("id as user_id", "displayName", "userPhoto");
      });

    // fs.writeFile(file.filename, file.buffer, ()=>{
    //   console.log("The file name is:", __filename);
    //   return __filename;
    // });
    // **** Need to fix to upload photos ****
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
      .then((id: Object) => {
        return this.knex("users")
          .where("id", id[0])
          .select("displayName", "userPhoto");
      });
  }
}
