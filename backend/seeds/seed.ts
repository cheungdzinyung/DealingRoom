import * as fs from "fs-extra";
import * as Knex from "knex";
import * as path from "path";

interface IItemsType {
  id: number;
  itemName: string;
  itemStock: number;
  minimumPrice: number;
  currentPrice: number;
  itemPhoto: string;
  itemDescription: string;
  isSpecial: boolean;
  isActive: boolean;
  category: string;
}

exports.seed = (knex: Knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users")
        .insert([
          {
            displayName: "ACDY",
            password: "$2b$10$aMVkMXNlDsAqwCN94421J.0QuCfJtkto39jmeBI619kVqN31LQBjW",
            role: "manager",
            userPhoto: "",
            username: "Andrew"
          },
          {
            displayName: "io",
            password: "$2b$10$4DkXdXX/ysplda5MCaw78eB0Q8IPJJ7Wv1Hh3DDEyUUT45yTNLgym",
            role: "manager",
            userPhoto: "",
            username: "Ivan"
          },
          {
            displayName: "Curtit",
            password: "$2b$10$HVwiMLFL4HC4b5XpsBdk5emwBK1hywORaxVBGUQipnBNKG1E0Cooe",
            role: "manager", 
            userPhoto: "",
            username: "Judith"
          },
          {
            displayName: "Harrixon",
            password: "$2b$10$FaDh6jBBZw/.RaegZIf7qeBL2qzxoJJXyArSKALpN0hLxSjOXLODm",
            role: "manager",
            userPhoto: "",
            username: "Harrison"
          }
        ])
        .then(() => {
          return knex("items")
            .del()
            .then(() => {
              return knex("categories").del();
            })
            .then(() => {
              const categoriesData = fs.readJsonSync(
                path.join(__dirname, "/categoriesData.json")
              );
              return knex("categories")
                .insert(categoriesData)
                .then(() => {
                  const itemsData = fs.readJsonSync(
                    path.join(__dirname, "/itemsData.json")
                  );
                  const itemsPromises: Array<{}> = [];
                  itemsData.forEach((item: IItemsType) => {
                    const category = item.category;
                    itemsPromises.push(createItems(knex, item, category));
                  });
                  return Promise.all(itemsPromises);
                });
            });
        });
    });
};

const createItems = (knex: Knex, item: IItemsType, category: string) => {
  return knex("categories")
    .where("categoryName", category)
    .first()
    .then(categoryRecord => {
      return knex("items").insert({
        itemName: item.itemName,
        itemStock: item.itemStock,
        categories_id: categoryRecord.id,
        minimumPrice: item.minimumPrice,
        currentPrice: item.currentPrice,
        itemPhoto: item.itemPhoto,
        itemDescription: item.itemDescription,
        isSpecial: item.isSpecial,
        isActive: item.isActive
      });
    });
};
