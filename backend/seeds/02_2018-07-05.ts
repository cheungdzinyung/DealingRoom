import * as fs from "fs-extra";
import * as Knex from "knex";
import * as path from "path";

const ordersData = fs.readJsonSync(path.join(__dirname, "/2018-07-05-orders.json"));
const ordersItemsData = fs.readJsonSync(path.join(__dirname, "/2018-07-05-orders_items.json"));
const itemsLogData = fs.readJsonSync(path.join(__dirname, "/2018-07-05-itemsLog.json"));
// const itemsData = fs.readJsonSync(path.join(__dirname, "/2018-07-05-items.json"));

exports.seed = async (knex: Knex) => {
  await knex("orders").insert(ordersData);
  await knex("orders_items").insert(ordersItemsData);
  await knex("itemsLog").insert(itemsLogData);
  // for (let i = 0; i < itemsData.length; i++) {
  //   await knex("items")
  //     .where("itemName", itemsData[i].itemName)
  //     .update({
  //       itemStock: itemsData[i].itemStock,
  //       currentPrice: itemsData[i].currentPrice
  //     });
  // }
};
