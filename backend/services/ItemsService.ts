import { Promise as BlueBirdPromise } from "bluebird";
import * as fs from "fs-extra";
import * as Knex from "knex";
import { IItemData } from "../interfaces";

export default class UsersService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public saveUpdateItemImage(
    id: number,
    file: Express.Multer.File,
    name: string
  ) {
    name = name.replace(/([^a-zA-Z0-9])/g, "").toLowerCase();
    const imagePath = `../storage/items/${name}`;
    fs.outputFile(imagePath, file.buffer);
    return this.knex("items")
      .where("id", id)
      .update({
        itemPhoto: `https://api.dealingroom.live/api/items/image/${id}`
      });
  }

  // Working 25/06/2018
  public getItemImage(id: number) {
    return this.knex("items")
      .where("id", id)
      .select("itemName");
  }

  // Working 10/06/18
  public add(data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .where("categoryName", data.categoryName)
      .select("id")
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .insert({
            categories_id: catId[0].id,
            currentPrice: data.currentPrice,
            isActive: true,
            isSpecial: data.isSpecial,
            itemDescription: data.itemDescription,
            itemName: data.itemName,
            itemPhoto: data.itemPhoto,
            itemStock: data.itemStock,
            minimumPrice: data.minimumPrice
          })
          .returning("id")
          .then(async (itemId: Knex.QueryCallback) => {
            if (file !== undefined) {
              await this.saveUpdateItemImage(itemId[0], file, data.itemName);
            }
            return this.knex("categories")
              .join("items", "categories.id", "=", "items.categories_id")
              .where("items.id", itemId[0])
              .select(
                "items.id as items_id",
                "items.itemName",
                "items.itemStock",
                "categories.categoryName",
                "items.minimumPrice",
                "items.currentPrice",
                "items.itemPhoto",
                "items.itemDescription",
                "items.isSpecial",
                "items.isActive"
              );
          });
      });
  }

  // Working 06/06/18
  public get(req: number) {
    return this.knex("categories")
      .join("items", "categories.id", "=", "items.categories_id")
      .where("items.id", req)
      .select(
        "items.id as items_id",
        "items.itemName",
        "items.itemStock",
        "categories.categoryName",
        "items.minimumPrice",
        "items.currentPrice",
        "items.itemPhoto",
        "items.itemDescription",
        "items.isSpecial",
        "items.isActive"
      );
  }

  // Working 23/06/18
  public getAllWithFluctuatingPrices(dateOfQuery: string) {
    // Obtain the list of categories in the database
    return this.knex("categories")
      .select("id as categories_id", "categoryName", "categoryPhoto")
      .then((categoryList: any) => {
        // loop through each category and obtain the list of items in the category
        return Promise.all(
          categoryList.map((category: object, i: number) => {
            return this.knex("items")
              .join("categories", "items.categories_id", "=", "categories.id")
              .select(
                "items.id as items_id",
                "items.itemName",
                "categories.categoryName",
                "items.itemStock",
                "items.minimumPrice",
                "items.currentPrice",
                "items.itemPhoto",
                "items.itemDescription",
                "items.isSpecial",
                "items.isActive"
              )
              .where("items.categories_id", categoryList[i].categories_id)
              .orderBy("items.id", "ase")
              .then((itemList: any) => {
                // loop through the list of items and obtain all the fluctuating information for the specified date while separating it by hours
                return Promise.all(
                  itemList.map((item: object, j: number) => {
                    return this.knex("itemsLog")
                      .join("items", "itemsLog.items_id", "=", "items.id")
                      .join(
                        "categories",
                        "items.categories_id",
                        "=",
                        "categories.id"
                      )
                      .select("items.itemName")
                      .select(
                        this.knex.raw(
                          `extract(hour from "itemsLog".created_at) as hour`
                        )
                      )
                      .avg("itemsLog.itemsLogPrice")
                      .whereRaw("??::date = ?", ["created_at", dateOfQuery])
                      .where("items.itemName", itemList[j].itemName)
                      .groupBy("itemName")
                      .groupByRaw(`extract('hour' from "itemsLog".created_at)`)
                      .then((itemLogSummary: any) => {
                        // reorganizing the data into the agreed upon format for chart package to read
                        return Promise.all(
                          itemLogSummary.map((order: object, k: number) => {
                            const itemLogSummaryPerItem = {
                              time: itemLogSummary[k].hour.toString(),
                              purchasePrice: parseInt(itemLogSummary[k].avg, 10)
                            };
                            return itemLogSummaryPerItem;
                          })
                        ).then((itemLogSummaryFormatted: any) => {
                          // assigning the fluctuating data to the item object
                          return (itemList[
                            j
                          ].charData = itemLogSummaryFormatted);
                        });
                      });
                  })
                ).then(() => {
                  return itemList;
                });
              });
          })
        ).then((result: any) => {
          // inserting the items' information into the final result object which is then returned
          return Promise.all(
            categoryList.map((category: object, j: number) => {
              const finalResult = {
                categoryName: categoryList[j].categoryName,
                categoryPhoto: categoryList[j].categoryPhoto,
                items: result[j]
              };
              return finalResult;
            })
          );
        });
      });
  }

  public async updateLogPrice() {
    // get the current date and hour
    const currentYear = await new Date().getFullYear();
    const currentMonth = (await new Date().getMonth()) + 1;
    const currentDate = await new Date().getDate();
    const currentHour = await new Date().getHours();

    // obtain the list of category id's in the category table
    const categoryList = await this.knex("categories").select(
      "id as categories_id"
    );

    // look through the itemLog and see which categories has been recorded in the last hour
    let list = await this.knex.raw(
      `SELECT "items"."categories_id" FROM "itemsLog" JOIN "items" ON "itemsLog"."items_id" = "items"."id" WHERE "created_at" BETWEEN '${currentYear}-${currentMonth}-${currentDate} ${currentHour}:00:00' AND '${currentYear}-${currentMonth}-${currentDate} ${currentHour}:59:59.999999+08' ORDER BY "items"."categories_id"`
    );
    list = list.rows;
    for (let i = 1; i < list.length; ) {
      list[i - 1].categories_id === list[i].categories_id
        ? list.splice(i, 1)
        : i++;
    }

    // remove category id's that exist in the list from the category list
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < categoryList.length; j++) {
        if (list[i].categories_id === categoryList[j].categories_id) {
          categoryList.splice(j, 1);
        }
      }
    }

    // loop through list of remaining category list to update the price as per current price in items table
    await BlueBirdPromise.map(categoryList, async (category: any) => {
      const itemList = await this.knex("items")
        .select("id", "currentPrice")
        .where("categories_id", category.categories_id);
      // loop through all items in the category and insert the current price into the itemsLog table
        await BlueBirdPromise.map(itemList, async (item: any) => {
        await this.knex("itemsLog").insert({
          items_id: item.id,
          itemsLogPrice: item.currentPrice,
          created_at: `${currentYear}-${currentMonth}-${currentDate} ${currentHour}:59:59.999999+08`
        });
      });
    });
    return categoryList;
  }

  // Working 23/06/18
  public getAllInCatWithFluctuatingPrices(
    catName: string,
    dateOfQuery: string
  ) {
    let catPhoto: string;
    this.knex("categories")
      .select("categoryPhoto")
      .where("categoryName", catName)
      .then((photos: Knex.QueryCallback) => {
        return (catPhoto = photos[0].categoryPhoto);
      });

    return this.knex("categories")
      .select("id")
      .where("categoryName", catName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .select(
            "id as items_id",
            "itemName",
            "itemStock",
            "minimumPrice",
            "currentPrice",
            "itemPhoto",
            "itemDescription",
            "isActive",
            "isSpecial"
          )
          .where("categories_id", catId[0].id)
          .orderBy("id", "ase")
          .then((itemList: any) => {
            return Promise.all(
              itemList.map((item: object, j: number) => {
                return this.knex("itemsLog")
                  .join("items", "itemsLog.items_id", "=", "items.id")
                  .join(
                    "categories",
                    "items.categories_id",
                    "=",
                    "categories.id"
                  )
                  .select("items.itemName")
                  .select(
                    this.knex.raw(
                      `extract(hour from "itemsLog".created_at) as hour`
                    )
                  )
                  .avg("itemsLog.itemsLogPrice")
                  .whereRaw("??::date = ?", ["created_at", dateOfQuery])
                  .where("items.itemName", itemList[j].itemName)
                  .groupBy("itemName")
                  .groupByRaw(`extract('hour' from "itemsLog".created_at)`)
                  .then((itemLogSummary: any) => {
                    // reorganizing the data into the agreed upon format for chart package to read
                    return Promise.all(
                      itemLogSummary.map((order: object, k: number) => {
                        const itemLogSummaryPerItem = {
                          time: itemLogSummary[k].hour.toString(),
                          purchasePrice: parseInt(itemLogSummary[k].avg, 10)
                        };
                        return itemLogSummaryPerItem;
                      })
                    ).then((itemLogSummaryFormatted: any) => {
                      // assigning the fluctuating data to the item object
                      return (itemList[j].charData = itemLogSummaryFormatted);
                    });
                  });
              })
            ).then(() => {
              return itemList;
            });
            const result = [
              {
                categoryName: catName,
                categoryPhoto: catPhoto,
                items: itemList
              }
            ];
            return result;
          });
      });
  }

  // Working 15/06/18
  public getAll(isActive: any) {
    if (isActive === undefined) {
      return this.knex("categories")
        .select("id", "categoryName", "categoryPhoto")
        .then((categoryList: any) => {
          return Promise.all(
            categoryList.map((item: object, i: number) => {
              return this.knex("items")
                .join("categories", "items.categories_id", "=", "categories.id")
                .select(
                  "items.id as items_id",
                  "items.itemName",
                  "categories.categoryName",
                  "items.itemStock",
                  "items.minimumPrice",
                  "items.currentPrice",
                  "items.itemPhoto",
                  "items.itemDescription",
                  "items.isSpecial",
                  "items.isActive"
                )
                .where("items.categories_id", categoryList[i].id)
                .orderBy("items.id", "ase");
            })
          ).then((itemList: any) => {
            return Promise.all(
              categoryList.map((category: object, j: number) => {
                const result = {
                  categoryName: categoryList[j].categoryName,
                  categoryPhoto: categoryList[j].categoryPhoto,
                  items: itemList[j]
                };
                return result;
              })
            );
          });
        });
    } else {
      return this.knex("categories")
        .select("id", "categoryName", "categoryPhoto")
        .then((categoryList: any) => {
          return Promise.all(
            categoryList.map((item: object, i: number) => {
              return this.knex("items")
                .join("categories", "items.categories_id", "=", "categories.id")
                .select(
                  "items.id as items_id",
                  "items.itemName",
                  "categories.categoryName",
                  "items.itemStock",
                  "items.minimumPrice",
                  "items.currentPrice",
                  "items.itemPhoto",
                  "items.itemDescription",
                  "items.isSpecial",
                  "items.isActive"
                )
                .where("items.categories_id", categoryList[i].id)
                .where("items.isActive", isActive)
                .orderBy("items.id", "ase");
            })
          ).then((itemList: any) => {
            return Promise.all(
              categoryList.map((category: object, j: number) => {
                const result = {
                  categoryName: categoryList[j].categoryName,
                  categoryPhoto: categoryList[j].categoryPhoto,
                  items: itemList[j]
                };
                return result;
              })
            );
          });
        });
    }
  }

  // Working 07/06/18
  public getAllInCat(catName: string, isActive: boolean) {
    let catPhoto: string;
    this.knex("categories")
      .select("categoryPhoto")
      .where("categoryName", catName)
      .then((photos: Knex.QueryCallback) => {
        return (catPhoto = photos[0].categoryPhoto);
      });
    return this.knex("categories")
      .select("id")
      .where("categoryName", catName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .select(
            "id as items_id",
            "itemName",
            "itemStock",
            "minimumPrice",
            "currentPrice",
            "itemPhoto",
            "itemDescription",
            "isActive",
            "isSpecial"
          )
          .where("categories_id", catId[0].id)
          .where("items.isActive", isActive)
          .orderBy("id", "ase")
          .then((itemList: Knex.QueryCallback) => {
            const result = [
              {
                categoryName: catName,
                categoryPhoto: catPhoto,
                items: itemList
              }
            ];
            return result;
          });
      });
  }

  // Working 10/06/18
  public update(id: number, data: IItemData, file: Express.Multer.File) {
    return this.knex("categories")
      .select("id")
      .where("categoryName", data.categoryName)
      .then((catId: Knex.QueryCallback) => {
        return this.knex("items")
          .where("items.id", id)
          .update({
            categories_id: catId[0].id,
            currentPrice: data.currentPrice,
            isActive: data.isActive,
            isSpecial: data.isSpecial,
            itemDescription: data.itemDescription,
            itemName: data.itemName,
            itemPhoto: data.itemPhoto,
            itemStock: data.itemStock,
            minimumPrice: data.minimumPrice
          })
          .returning("id");
      })
      .then(async (itemId: Knex.QueryCallback) => {
        if (file !== undefined) {
          await this.saveUpdateItemImage(itemId[0], file, data.itemName);
        }
        return this.knex("categories")
          .join("items", "categories.id", "=", "items.categories_id")
          .where("items.id", itemId[0])
          .select(
            "items.id as items_id",
            "items.itemName",
            "items.itemStock",
            "categories.categoryName",
            "items.minimumPrice",
            "items.currentPrice",
            "items.itemPhoto",
            "items.itemDescription",
            "items.isSpecial",
            "items.isActive"
          );
      });
  }
}
