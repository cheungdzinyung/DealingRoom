const fs = require("fs-extra");
const path = require("path");

exports.seed = function(knex, Promise) {
  let Categories = fs.readJsonSync(
    path.join(__dirname, "/categoriesData.json")
  );
  let Items = fs.readJsonSync(path.join(__dirname, "/itemsData.json"));

  return knex("categories")
    .insert(Categories)
    .then(() => {
      let itemArray = [];
      Items.forEach(item => {
        let category = item.category;
        itemArray.push(createProduct(knex, item, category));
      });
      return Promise.all(itemArray);
    });
};

const createProduct = (knex, item, category) => {
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
