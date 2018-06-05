import * as Knex from 'knex';
import * as fs from 'fs-extra';
import * as path from 'path';

interface IItemsType {
  id: number,
  itemName: string,
  itemStock: number,
  minimumPrice: number,
  currentPrice: number,
  itemPhoto: string,
  itemDescription: string,
  isSpecial: boolean,
  isActive: boolean,
  category: string
}

exports.seed = (knex: Knex) => {
  return knex("items")
    .del()
    .then(() => {
      return knex("categories").del();
    })
    .then(() => {
      let categoriesData = fs.readJsonSync(path.join(__dirname, "/categoriesData.json"));
      return knex("categories")
        .insert(categoriesData)
        .then(() => {
          let itemsData = fs.readJsonSync(path.join(__dirname, "/itemsData.json"));
          let itemsPromises: {}[] = [];
          itemsData.forEach((item: IItemsType) => {
            let category = item.category;
            itemsPromises.push(createItems(knex, item, category));
          });
          return Promise.all(itemsPromises);
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
