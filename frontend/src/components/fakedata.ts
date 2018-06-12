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

export const orderList: IPureUsersOrderList = {
  displayName: "Johnny",
  userName: "John Doe",
  users_id: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  orders:
    [
      {
        isPaid: false,
        orderTotal: 155,
        orderingTime: 20180608151724.40643208,
        orders_id: 1,
        status: "confirmed",
        table: 11,
        // tslint:disable-next-line:object-literal-sort-keys
        orderItems:
          [
            {
              garnish: "normal",
              ice: "normal",
              itemName: "Asahi",
              purchasePrice: 105.00,
              sweetness: "normal"
            },
            {
              garnish: "normal",
              ice: "extra",
              itemName: "Grey Goose",
              purchasePrice: 150.00,
              sweetness: "normal"
            }
          ]
      },
      {
        isPaid: false,
        orderTotal: 105.00,
        orderingTime: 20180608152014.88850108,
        orders_id: 2,
        status: "confirmed",
        table: 11,
        // tslint:disable-next-line:object-literal-sort-keys
        orderItems:
          [
            {
              garnish: "normal",
              ice: "normal",
              itemName: "Asahi",
              purchasePrice: 105.00,
              sweetness: "normal"
            }
          ]
      }
      ,
      {
        isPaid: true,
        orderTotal: 105.00,
        orderingTime: 20180608152014.88850108,
        orders_id: 3,
        status: "ordered",
        table: 11,
        // tslint:disable-next-line:object-literal-sort-keys
        orderItems:
          [
            {
              garnish: "normal",
              ice: "normal",
              itemName: "Screwdriver",
              purchasePrice: 105.00,
              sweetness: "extra"
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
