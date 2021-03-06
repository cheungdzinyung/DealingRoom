import {
  IOrder,
  // IItemWithMod,
  // ICustomerOrderList
  IMenuCategoryWithFlux,
  IMenuItemWithoutFlux,
  IMenuItemWithFlux,
  IConsumptionGraphData
} from "src/modules";

export const singleCategoryMenuItems: IMenuCategoryWithFlux = {
  categoryName: "Beer",
  categoryPhoto:
    "https://www.google.com.hk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi2-IaRrvHbAhXFULwKHQSjAiUQjRx6BAgBEAU&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F49458472%2Freact-native-image-with-token-and-ttl%3Fnoredirect%3D1%26lq%3D1&psig=AOvVaw3CM4Pw4ZoRdE9zQaPCxRG8&ust=1530103560191004",
  items: [
    {
      categoryName: "Beer",
      currentPrice: 60.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Asahi",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 1,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "9", purchasePrice: 30 },
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 18 },
        { time: "", purchasePrice: 23 },
        { time: "Now", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 60 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 28 },
        { time: "", purchasePrice: 33 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 60.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Guinness",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 1,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 30 },
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 18 },
        { time: "", purchasePrice: 23 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 55.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Lager",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 1,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 30 },
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 18 },
        { time: "", purchasePrice: 23 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 60 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 28 },
        { time: "", purchasePrice: 33 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 60 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 28 },
        { time: "", purchasePrice: 33 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 30 },
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 18 },
        { time: "", purchasePrice: 23 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 60 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 28 },
        { time: "", purchasePrice: 33 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 30 },
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 18 },
        { time: "", purchasePrice: 23 },
        { time: "", purchasePrice: 34 }
      ]
    },
    {
      categoryName: "Beer",
      currentPrice: 50.0,
      isActive: true,
      isSpecial: false,
      itemDescription:
        "ASAHI SUPER DRY’s uses carefully selected strains of yeast that not only facilitate outstanding fermentation.",
      itemName: "Heineken",
      itemPhoto: "../storage/items/asahi.jpeg",
      itemStock: 100,
      items_id: 2,
      minimumPrice: 15.0,
      // tslint:disable-next-line:object-literal-sort-keys
      chartData: [
        { time: "", purchasePrice: 40 },
        { time: "", purchasePrice: 60 },
        { time: "", purchasePrice: 20 },
        { time: "", purchasePrice: 27 },
        { time: "", purchasePrice: 28 },
        { time: "", purchasePrice: 33 },
        { time: "", purchasePrice: 34 }
      ]
    }
  ]
};

export const onelineitemtest: IMenuItemWithoutFlux = {
  items_id: 1,
  itemName: "Asahi",
  itemStock: 12,
  categoryName: "beer",
  itemDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  minimumPrice: 12,
  currentPrice: 13,
  itemPhoto: "",
  isSpecial: true,
  isActive: true
};

export const adminAllItemTest: IMenuItemWithoutFlux[] = [
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "./assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: true
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: false
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: true,
    isActive: true
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: true
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: true,
    isActive: true
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: false
  }
];

export const displayMenuItemListTest: IMenuItemWithFlux[] = [
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "./assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: true,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: false,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: true,
    isActive: true,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: true,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: true,
    isActive: true,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  },
  {
    items_id: 1,
    itemName: "Asahi",
    itemStock: 12,
    categoryName: "beer",
    itemDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    minimumPrice: 12,
    currentPrice: 13,
    itemPhoto: "../../assets/images/squarebeer.jpg",
    isSpecial: false,
    isActive: false,
    chartData: [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ]
  }
];

export const allOrders: IOrder[] = [
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 12,
    table: 12,
    status: "confirmed",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 13,
        itemName: "Daiquiri",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 18,
    table: 12,
    status: "made",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 13,
        itemName: "Daiquiri",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 2,
    table: 12,
    status: "confirmed",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 13,
        itemName: "Daiquiri",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 6,
    table: 12,
    status: "served",
    isPaid: true,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 8,
    table: 12,
    status: "served",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 13,
        itemName: "Daiquiri",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 12,
    table: 12,
    status: "served",
    isPaid: true,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 6,
        itemName: "Heineken",
        purchasePrice: 60,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 16,
        itemName: "Margarita",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 16,
        itemName: "Margarita",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 3,
    table: 12,
    status: "made",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 12,
        itemName: "Long Island Ice Tea",
        purchasePrice: 80,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 13,
        itemName: "Daiquiri",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 5,
    table: 12,
    status: "made",
    isPaid: false,
    orderTotal: 300,
    orderItems: [
      {
        items_id: 19,
        itemName: "Old Fashion",
        purchasePrice: 100,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 16,
        itemName: "Margarita",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 16,
        itemName: "Margarita",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      },
      {
        items_id: 15,
        itemName: "Cosmopolitan",
        purchasePrice: 120,
        ice: "normal",
        sweetness: "normal",
        garnish: "normal"
      }
    ]
  }
];

export const profileConsumptionGraphTest: IConsumptionGraphData[] = [
  { category: "beer", you: 100, everyone: 200, maxPrice: 250 },
  { category: "shake", you: 190, everyone: 180, maxPrice: 250 },
  { category: "love", you: 100, everyone: 250, maxPrice: 250 },
  { category: "hate", you: 170, everyone: 182, maxPrice: 250 },
  { category: "smart", you: 230, everyone: 100, maxPrice: 250 },
  { category: "power", you: 100, everyone: 90, maxPrice: 250 }
];

// used at first for the OrderCard but change into [allOrders]
// export const orderItems: IOrder = {
//   users_id: 3,
//   userName: "judith",
//   displayName: "Juju",
//   orders_id: 12,
//   table: 12,
//   status: "confirmed",
//   isPaid: false,
//   orderTotal: 300,
//   orderItems: [{
//     items_id: 2,
//     itemName: "Heineken",
//     purchasePrice: 60,
//     ice: "normal",
//     sweetness: "normal",
//     garnish: "normal",
//   },
//   {
//     items_id: 3,
//     itemName: "Long Island Ice Tea",
//     purchasePrice: 80,
//     ice: "normal",
//     sweetness: "normal",
//     garnish: "normal",
//   },
//   {
//     items_id: 4,
//     itemName: "Cosmopolitan",
//     purchasePrice: 120,
//     ice: "normal",
//     sweetness: "normal",
//     garnish: "normal",
//   },
//   {
//     items_id: 18,
//     itemName: "Daiquiri",
//     purchasePrice: 100,
//     ice: "normal",
//     sweetness: "normal",
//     garnish: "normal",
//   },
// ],
// };

// export const chartOption = {
//   layout: {
//     // padding: 10
//   },
//   legend: {
//     display: false
//     // position: "bottom"
//   },
//   scales: {
//     display: false,
//     gridLines: {
//       color: "#ffffff",
//       display: true
//     }
//   },
//   title: {
//     display: false
//   }
// };

// export const categories = {
//   name: [
//     "beer",
//     "Cocktails",
//     "redWine",
//     "whiteWine",
//     "champagne",
//     "vodka",
//     "tequila",
//     "whiskey",
//     "gin",
//     "rum",
//     "brandy",
//     "non-alcoholic",
//     "snack",
//     "main",
//     "dessert"
//   ]
// };

// export const orderList: ICustomerOrderList = {
//   displayName: "Johnny",
//   userName: "John Doe",
//   users_id: 1,
//   // tslint:disable-next-line:object-literal-sort-keys
//   orders: [
//     {
//       isPaid: false,
//       orderTotal: 155,
//       orderingTime: 20180608151724.40643208,
//       orders_id: 1,
//       status: "confirmed",
//       table: 11,
//       // tslint:disable-next-line:object-literal-sort-keys
//       orderItems: [
//         {
//           garnish: "normal",
//           ice: "normal",
//           itemName: "Asahi",
//           item_id: 1,
//           purchasePrice: 105.0,
//           sweetness: "normal"
//         },
//         {
//           garnish: "normal",
//           ice: "extra",
//           itemName: "Grey Goose",
//           item_id: 2,
//           purchasePrice: 150.0,
//           sweetness: "normal"
//         }
//       ]
//     },
//     {
//       isPaid: false,
//       orderTotal: 105.0,
//       orderingTime: 20180608152014.88850108,
//       orders_id: 2,
//       status: "confirmed",
//       table: 11,
//       // tslint:disable-next-line:object-literal-sort-keys
//       orderItems: [
//         {
//           garnish: "normal",
//           ice: "normal",
//           itemName: "Asahi",
//           item_id: 1,
//           purchasePrice: 105.0,
//           sweetness: "normal"
//         }
//       ]
//     },
//     {
//       isPaid: true,
//       orderTotal: 105.0,
//       orderingTime: 20180608152014.88850108,
//       orders_id: 3,
//       status: "ordered",
//       table: 11,
//       // tslint:disable-next-line:object-literal-sort-keys
//       orderItems: [
//         {
//           garnish: "normal",
//           ice: "normal",
//           itemName: "Screwdriver",
//           item_id: 3,
//           purchasePrice: 105.0,
//           sweetness: "extra"
//         }
//       ]
//     }
//   ]
// };

// export const singleOrder: IOrder = {
//   displayName: "Sabrina",
//   isPaid: false,
//   orderTotal: 155,
//   orders_id: 1,
//   status: "confirmed",
//   table: 11,
//   userName: "sabrina_phy",
//   users_id: 1,
//   // tslint:disable-next-line:object-literal-sort-keys
//   orderItems: [
//     {
//       garnish: "normal",
//       ice: "normal",
//       itemName: "Asahi",
//       item_id: 1,
//       purchasePrice: 105.0,
//       sweetness: "normal"
//     },
//     {
//       garnish: "normal",
//       ice: "extra",
//       itemName: "Grey Goose",
//       item_id: 2,
//       purchasePrice: 150.0,
//       sweetness: "normal"
//     }
//   ]
// };

// export const requestList: IItemWithMod[] = [
//   {
//     garnish: "normal",
//     ice: "normal",
//     itemName: "Asahi",
//     item_id: 1,
//     purchasePrice: 105,
//     sweetness: "normal"
//   },
//   {
//     garnish: "normal",
//     ice: "extra",
//     itemName: "Grey Goose",
//     item_id: 2,
//     purchasePrice: 150,
//     sweetness: "normal"
//   },
//   {
//     garnish: "normal",
//     ice: "extra",
//     itemName: "Sex on the beach",
//     item_id: 4,
//     purchasePrice: 150,
//     sweetness: "normal"
//   },
//   {
//     garnish: "normal",
//     ice: "without",
//     itemName: "Some weird shit",
//     item_id: 9,
//     purchasePrice: 150,
//     sweetness: "extra"
//   }
// ];
