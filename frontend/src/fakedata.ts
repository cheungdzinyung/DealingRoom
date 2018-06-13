import {
  IGraphDataCombiner,
  IPureItemLine,
  IPureMenuItemWithFluctuation,
  IPureOrder,
  IPureUsersOrderList
} from "src/modules";

export const menuItems: IPureMenuItemWithFluctuation[] = [
  {
    category: "beer",
    chartData: {
      datasets: [
        {
          backgroundColor: "rgba(0,0,0,0)",
          data: [12, 13, 8, 16, 3, 46],
          label: "hey",
          pointColor: "rgba(111, 207, 151, 1)",
          pointHighlightFill: "rgba(235, 87, 87, 1)",
          pointHighlightStroke: "rgba(255, 205, 68, .9)",
          pointStrokeColor: "rgba(235, 87, 87, .24)",
          strokeColor: "rgba(66, 66, 66, .4)"
        }
      ],
      labels: ["09:00", "", "", "", "", "Now"]
    },
    currentPrice: 60.0,
    isActive: true,
    isSpecial: false,
    itemDescription:
      "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
    itemName: "Asahi",
    itemPhoto: "../storage/items/asahi.jpeg",
    itemStock: 100,
    item_id: 1,
    minimumPrice: 15.0
  },
  {
    category: "beer",
    chartData: {
      datasets: [
        {
          backgroundColor: "rgba(0,0,0,0)",
          data: [100, 13, 8, 16, 3, 46],
          label: "hey",
          pointColor: "rgba(111, 207, 151, 1)",
          pointHighlightFill: "rgba(235, 87, 87, 1)",
          pointHighlightStroke: "rgba(255, 205, 68, .9)",
          pointStrokeColor: "rgba(235, 87, 87, .24)",
          strokeColor: "rgba(66, 66, 66, .4)"
        }
      ],
      labels: ["09:00", "", "", "", "", "Now"]
    },
    currentPrice: 60.0,
    isActive: true,
    isSpecial: false,
    itemDescription:
      "Brewed for the first time in 1904, Carlsberg pilsner is, in fact, part of the Danish cultural heritage and the Danish thirst.",
    itemName: "Carlsberg",
    itemPhoto: "../storage/items/carlsberg.jpeg",
    itemStock: 100,
    item_id: 2,
    minimumPrice: 15.0
  },
  {
    category: "beer",
    chartData: {
      datasets: [
        {
          backgroundColor: "rgba(0,0,0,0)",
          data: [25, 13, 8, 16, 3, 46],
          label: "hey",
          pointColor: "rgba(111, 207, 151, 1)",
          pointHighlightFill: "rgba(235, 87, 87, 1)",
          pointHighlightStroke: "rgba(255, 205, 68, .9)",
          pointStrokeColor: "rgba(235, 87, 87, .24)",
          strokeColor: "rgba(66, 66, 66, .4)"
        }
      ],
      labels: ["09:00", "", "", "", "", "Now"]
    },
    currentPrice: 80.0,
    isActive: true,
    isSpecial: false,
    itemDescription:
      "Sweet smelling with a coffee and malty nose. Perfect balance of bitter and sweet with malt and roast character. ",
    itemName: "Guinness",
    itemPhoto: "../storage/items/guinness.jpeg",
    itemStock: 100,
    item_id: 1,
    minimumPrice: 20.0
  }
];

export const comparisonData: IGraphDataCombiner = {
  labels: ["beer", "one", "two", "ha", "omg", "lol", "lmfao"],
  // tslint:disable-next-line:object-literal-sort-keys
  datasets: [
    {
      label: "You",
      // tslint:disable-next-line:object-literal-sort-keys
      backgroundColor: "rgba(111, 207, 151, 1)",
      strokeColor: "rgb(235, 87, 87, 1)",
      // tslint:disable-next-line:object-literal-sort-keys
      pointColor: "rgba(233, 219, 204, 1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 90, 81, 56, 55, 0]
    },
    {
      label: "Bar",
      // tslint:disable-next-line:object-literal-sort-keys
      backgroundColor: "rgba(111, 207, 151, 1)",
      strokeColor: "rgb(235, 87, 87, 1)",
      // tslint:disable-next-line:object-literal-sort-keys
      pointColor: "rgba(233, 219, 204, 1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [30, 29, 41, 23, 5, 155, 10]
    }
  ]
};

export const chartOption = {
  layout: {
    // padding: 10
  },
  legend: {
    display: false
    // position: "bottom"
  },
  scales: {
    display: false,
    gridLines: {
      color: "#ffffff",
      display: true
    }
  },
  title: {
    display: false
  }
};

export const categories = {
  name: [
    "beer",
    "Cocktails",
    "redWine",
    "whiteWine",
    "champagne",
    "vodka",
    "tequila",
    "whiskey",
    "gin",
    "rum",
    "brandy",
    "non-alcoholic",
    "snack",
    "main",
    "dessert"
  ]
};

export const orderList: IPureUsersOrderList = {
  displayName: "Johnny",
  userName: "John Doe",
  users_id: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  orders: [
    {
      isPaid: false,
      orderTotal: 155,
      orderingTime: 20180608151724.40643208,
      orders_id: 1,
      status: "confirmed",
      table: 11,
      // tslint:disable-next-line:object-literal-sort-keys
      orderItems: [
        {
          garnish: "normal",
          ice: "normal",
          itemName: "Asahi",
          item_id: 1,
          purchasePrice: 105.0,
          sweetness: "normal"
        },
        {
          garnish: "normal",
          ice: "extra",
          itemName: "Grey Goose",
          item_id: 2,
          purchasePrice: 150.0,
          sweetness: "normal"
        }
      ]
    },
    {
      isPaid: false,
      orderTotal: 105.0,
      orderingTime: 20180608152014.88850108,
      orders_id: 2,
      status: "confirmed",
      table: 11,
      // tslint:disable-next-line:object-literal-sort-keys
      orderItems: [
        {
          garnish: "normal",
          ice: "normal",
          itemName: "Asahi",
          item_id: 1,
          purchasePrice: 105.0,
          sweetness: "normal"
        }
      ]
    },
    {
      isPaid: true,
      orderTotal: 105.0,
      orderingTime: 20180608152014.88850108,
      orders_id: 3,
      status: "ordered",
      table: 11,
      // tslint:disable-next-line:object-literal-sort-keys
      orderItems: [
        {
          garnish: "normal",
          ice: "normal",
          itemName: "Screwdriver",
          item_id: 3,
          purchasePrice: 105.0,
          sweetness: "extra"
        }
      ]
    }
  ]
};

export const singleOrder: IPureOrder = {
  displayName: "Sabrina",
  isPaid: false,
  orderTotal: 155,
  orders_id: 1,
  status: "confirmed",
  table: 11,
  userName: "sabrina_phy",
  users_id: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  orderItems: [
    {
      garnish: "normal",
      ice: "normal",
      itemName: "Asahi",
      item_id: 1,
      purchasePrice: 105.0,
      sweetness: "normal"
    },
    {
      garnish: "normal",
      ice: "extra",
      itemName: "Grey Goose",
      item_id: 2,
      purchasePrice: 150.0,
      sweetness: "normal"
    }
  ]
};

export const requestList: IPureItemLine[] = [
  {
    garnish: "normal",
    ice: "normal",
    itemName: "Asahi",
    item_id: 1,
    purchasePrice: 105,
    sweetness: "normal"
  },
  {
    garnish: "normal",
    ice: "extra",
    itemName: "Grey Goose",
    item_id: 2,
    purchasePrice: 150,
    sweetness: "normal"
  },
  {
    garnish: "normal",
    ice: "extra",
    itemName: "Sex on the beach",
    item_id: 4,
    purchasePrice: 150,
    sweetness: "normal"
  },
  {
    garnish: "normal",
    ice: "without",
    itemName: "Some weird shit",
    item_id: 9,
    purchasePrice: 150,
    sweetness: "extra"
  }
];
