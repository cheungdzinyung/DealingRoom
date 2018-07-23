require('ts-node/register');

const ItemService = require('../../services/ItemsService').default;
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "dealingroom",
        port: 5432,
        user: "harrixon",
        password: "password"
    },
});


describe("ItemService", () => {
    beforeEach((done) => {
        itemService = new ItemService(knex);
        done();
    });

    const newItem = {
        itemName: "test.itemName",
        itemDescription: "test.itemDescription",
        categoryName: "beer",
        itemStock: 1000,
        currentPrice: "20.00",
        minimumPrice: "10.00",
        itemPhoto: "https://api.dealingroom.live/api/items/image/9999",
        isActive: true,
        isSpecial: false,
    }

    it("should add a new item to DB", (done) => {
        itemService.add(newItem)
            .then(writtenItem => {
                existingItem = writtenItem;
                // gen UID
                expect(typeof(writtenItem[0].items_id) === "number").toBeTruthy();
                // check input is correct
                expect(newItem.itemName).toEqual(writtenItem[0].itemName);
                expect(newItem.itemDescription).toEqual(writtenItem[0].itemDescription);
                expect(newItem.categoryName).toEqual(writtenItem[0].categoryName);
                expect(newItem.itemStock).toEqual(writtenItem[0].itemStock);
                expect(newItem.currentPrice).toEqual(writtenItem[0].currentPrice);
                expect(newItem.minimumPrice).toEqual(writtenItem[0].minimumPrice);
                expect(newItem.itemPhoto).toEqual(writtenItem[0].itemPhoto);
                expect(newItem.isActive).toEqual(writtenItem[0].isActive);
                expect(newItem.isSpecial).toEqual(writtenItem[0].isSpecial);
                done();
            })
            .catch(err => {
                console.log(err)
            });
    });

    it("should update an existing item in DB", (done) => {
        // add a new item first
        itemService.add(newItem)
            .then(writtenItem => {
                const update = { 
                    ...writtenItem[0],
                    itemName: writtenItem[0].itemName.toUpperCase(),
                    itemDescription: writtenItem[0].itemDescription.toUpperCase(),
                    itemStock: 2000,
                    minimumPrice: "40.00",
                    itemPhoto: "",
                    isActive: !writtenItem[0].isActive,
                    isSpecial: !writtenItem[0].isSpecial,
                };
                // update the added item
                itemService.update(writtenItem[0].items_id, update)
                    .then(updatedItem => {
                        // check un-touched details are correct
                        expect(update.items_id).toEqual(updatedItem[0].items_id);
                        expect(update.categoryName).toEqual(updatedItem[0].categoryName);
                        expect(update.currentPrice).toEqual(updatedItem[0].currentPrice);
                        // check update part is correct
                        expect(update.itemName).toEqual(updatedItem[0].itemName);
                        expect(update.itemDescription).toEqual(updatedItem[0].itemDescription);
                        expect(update.itemStock).toEqual(updatedItem[0].itemStock);
                        expect(update.minimumPrice).toEqual(updatedItem[0].minimumPrice);
                        expect(update.itemPhoto).toEqual(updatedItem[0].itemPhoto);
                        expect(update.isActive).toEqual(updatedItem[0].isActive);
                        expect(update.isSpecial).toEqual(updatedItem[0].isSpecial);
                        done();
                    })
            })
            .catch(err => {
                console.log(err);
            });
    });

    it("should get an item according to items_id", (done) => {
        var items_id = 1;
        itemService.get(items_id)
            .then(result => {
                expect(result[0].items_id).toEqual(items_id);
                expect(typeof(result[0].itemName)).toEqual("string");
                expect(typeof(result[0].itemDescription)).toEqual("string");
                expect(typeof(result[0].categoryName)).toEqual("string");
                expect(typeof(result[0].itemStock)).toEqual("number");
                expect(typeof(parseFloat(result[0].currentPrice))).toEqual("number");
                expect(typeof(parseFloat(result[0].minimumPrice))).toEqual("number");
                expect(typeof(result[0].itemPhoto)).toEqual("string");
                expect(typeof(result[0].isActive)).toEqual("boolean");
                expect(typeof(result[0].isSpecial)).toEqual("boolean");
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it("should get all items with flux price", (done) => {
        var dateOfQuery = "2018-06-06";
        var maxmin = "true";
        itemService.getAllWithFluctuatingPrices(dateOfQuery, maxmin)
            .then(menu => {
                expect(menu.length > 1).toBeTruthy();
                menu.forEach(cat => {
                    expect(cat.hasOwnProperty("categoryName")).toBeTruthy();
                    expect(cat.hasOwnProperty("categoryPhoto")).toBeTruthy();
                    expect(cat.hasOwnProperty("todayMax")).toBeTruthy();
                    expect(cat.hasOwnProperty("todayMin")).toBeTruthy();
                    expect(cat.hasOwnProperty("items")).toBeTruthy();
                    expect(typeof(cat.categoryName)).toBe("string");
                    expect(typeof(cat.categoryName)).toBe("string");
                    cat.items.forEach(item => {
                        expect(item.hasOwnProperty("items_id")).toBeTruthy();
                        expect(item.hasOwnProperty("itemName")).toBeTruthy();
                        expect(item.hasOwnProperty("categoryName")).toBeTruthy();
                        expect(item.hasOwnProperty("itemStock")).toBeTruthy();
                        expect(item.hasOwnProperty("minimumPrice")).toBeTruthy();
                        expect(item.hasOwnProperty("currentPrice")).toBeTruthy();
                        expect(item.hasOwnProperty("itemPhoto")).toBeTruthy();
                        expect(item.hasOwnProperty("itemDescription")).toBeTruthy();
                        expect(item.hasOwnProperty("isSpecial")).toBeTruthy();
                        expect(item.hasOwnProperty("isActive")).toBeTruthy();
                        expect(item.hasOwnProperty("chartData")).toBeTruthy();
                    });
                });
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it("should drop all item prices", (done) => {
        var discountInPercentage = 1;
        itemService.priceDrop(discountInPercentage)
            .then(totalDiscount => {
                expect(typeof(totalDiscount)).toBe("number");
                done();
            });
    });

});