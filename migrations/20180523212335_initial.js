exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", users => {
      users
        .increments("id")
        .unsigned()
        .primary();
      users.string("username").notNull();
      users.string("password").notNull();
      users.string("displayName");
      users.text("userPhoto");
      users.text("facebookId");
      users.enum("role", ["bartedner", "server", "manager", "customer"]);
      users.boolean("isActive");
    })
    .then(() => {
      return knex.schema.createTable("orders", orders => {
        orders
          .increments("id")
          .unsigned()
          .primary();
        orders
          .integer("users_id")
          .unsigned()
          .notNull();
        orders.foreign("users_id").references("users.id");
        orders.smallint("table");
        orders.enum("status", [
          "ordered",
          "confirmed",
          "made",
          "served",
          "paid",
          "cancelled"
        ]);
        orders.timestamps(false, true);
      });
    })
    .then(() => {
      return knex.schema.createTable("items", items => {
        items
          .increments()
          .unsigned()
          .primary();
        items.string("itemName");
        items.integer("itemStock");
        items.decimal("minimumPrice");
        items.decimal("currentPrice");
        items.enum("category", [
          "beer",
          "cocktail",
          "wine",
          "non-alcoholic",
          "snack",
          "main",
          "dessert"
        ]);
        items.text("itemPhoto");
        items.text("itemDescription");
        items.boolean("isActive");
      });
    })
    .then(() => {
      return knex.schema.createTable("orders_items", ordersItems => {
        ordersItems
          .increments()
          .unsigned()
          .primary();
        ordersItems
          .integer("orders_id")
          .unsigned()
          .notNull();
        ordersItems.foreign("orders_id").references("orders.id");
        ordersItems
          .integer("items_id")
          .unsigned()
          .notNull();
        ordersItems.foreign("items_id").references("items.id");
        ordersItems
          .enum("ice", ["extra", "normal", "without"])
          .defaultTo("normal");
        ordersItems
          .enum("sweetness", ["extra", "normal", "without"])
          .defaultTo("normal");
        ordersItems
          .enum("garnish", ["extra", "normal", "without"])
          .defaultTo("normal");
      });
    })
    .then(() => {
      return knex.schema.createTable("itemsLog", itemsLog => {
        itemsLog
          .increments()
          .unsigned()
          .primary();
        itemsLog
          .integer("items_id")
          .unsigned()
          .notNull();
        itemsLog.foreign("items_id").references("items.id");
        itemsLog.timestamps(false, true);
        itemsLog.decimal("itemsLogPrice");
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("itemsLog")
    .then(() => knex.schema.dropTable("orders_items"))
    .then(() => knex.schema.dropTable("items"))
    .then(() => knex.schema.dropTable("orders"))
    .then(() => knex.schema.dropTable("users"));
};
