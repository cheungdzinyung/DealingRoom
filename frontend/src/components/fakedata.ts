import { IPureUsersOrderList } from "src/modules";

export const items = [
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Asahi",
    percentage: 1.12
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Pinot Blanc",
    percentage: -10
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Taittinger",
    percentage: 32.15
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Hennessy Paradis",
    percentage: -31
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Pinot Blanc",
    percentage: -10
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Taittinger",
    percentage: 32.15
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Hennessy Paradis",
    percentage: -31
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Pinot Blanc",
    percentage: -10
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Taittinger",
    percentage: 32.15
  },
  {
    currentPrice: 60,
    description:
      "Made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, , which gives the drink the same amber hue as its namesake.",
    name: "Hennessy Paradis",
    percentage: -31
  }
];

export const chartData = {
  labels: ["", "", "", "", "", "", ""],
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

export const orderList:IPureUsersOrderList = {
  users_id: 1,
  username: "John Doe",
  displayName: "Johnny",
  orders:
    [
      {
        "orders_id": 1,
        "table": 11,
        "status": "confirmed",
        "isPaid": false,
        "orderingTime": 2018 - 06 - 08 15: 17: 24.406432+08,
        "orderItems":
          [
            {
              "itemName": "Asahi",
              "ice": "normal",
              "sweetness": "normal",
              "garnish": "normal",
              "purchasePrice": 105.00
            },
            {
              "itemName": "Grey Goose",
              "ice": "extra",
              "sweetness": "normal",
              "garnish": "normal",
              "purchasePrice": 150.00
            }
          ]
      },
      {
        "orders.id": 2,
        "table": 11,
        "status": "confirmed",
        "isPaid": false,
        "orderingTime": 2018 - 06 - 08 15: 20: 14.888501+08,
        "orderItems":
          [
            {
              "itemName": "Asahi",
              "ice": "normal",
              "sweetness": "normal",
              "garnish": "normal",
              "purchasePrice": 105.00
            }
          ]
      }
    ]
};

export const requestList = [
  {
    garnish: "normal",
    ice: "normal",
    itemName: "Asahi",
    purchasePrice: 105,
    sweetness: "normal"
  },
  {
    garnish: "normal",
    ice: "extra",
    itemName: "Grey Goose",
    purchasePrice: 150,
    sweetness: "normal"
  }
];
