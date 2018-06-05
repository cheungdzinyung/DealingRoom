import * as Knex from "knex";
import * as fs from "fs-extra";
import * as path from "path";

let categoriesData = fs.readJsonSync(
  path.join(__dirname, "/categoriesData.json")
);
let itemsData = fs.readJsonSync(path.join(__dirname, "/itemsData.json"));

exports.seed = (knex: Knex) => {
  return knex("items").del()
    .then(() => {
      return knex("categories").del();
    })
    .then(() => {
      return knex("categories")
        .insert(categoriesData)
        .then(() => {
          let itemsPromises: {}[] = [];
          itemsData.forEach(item => {
            let category = item.category;
            itemsPromises.push(createItems(knex, item, category));
          });
          return Promise.all(itemsPromises);
        });
    });
};

const createItems = (knex: Knex, item, category) => {
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
