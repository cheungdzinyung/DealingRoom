import {
  
  IOrder,
  // IItemWithMod,
  // ICustomerOrderList
  IMenuCategoryWithFlux, IMenuItemWithoutFlux
} from "src/modules";

export const singleCategoryMenuItems: IMenuCategoryWithFlux = {
  categoryName: "Beer",
  categoryPhoto: "www.dealingroom.com/public/img/beer.jpeg",
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
]

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
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 18,
    table: 12,
    status: "confirmed",
    isPaid: false,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 20,
    table: 12,
    status: "confirmed",
    isPaid: false,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
{
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 6,
    table: 12,
    status: "confirmed",
    isPaid: false,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
]

export const pendingOrders: IOrder[] = [
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 1,
    table: 12,
    status: "served",
    isPaid: false,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 3,
    table: 12,
    status: "served",
    isPaid: true,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 4,
    table: 12,
    status: "served",
    isPaid: true,
    orderTotal: 220,
    orderItems: [{
      items_id: 9,
      itemName: "Bloody Mary",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
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
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 15,
      itemName: "Cosmopolitan",
      purchasePrice: 120,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
  {
    users_id: 3,
    userName: "judith",
    displayName: "Juju",
    orders_id: 5,
    table: 12,
    status: "made",
    isPaid: true,
    orderTotal: 300,
    orderItems: [{
      items_id: 6,
      itemName: "Heineken",
      purchasePrice: 60,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 12,
      itemName: "Long Island Ice Tea",
      purchasePrice: 80,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
    {
      items_id: 13,
      itemName: "Daiquiri",
      purchasePrice: 100,
      ice: "normal",
      sweetness: "normal",
      garnish: "normal",
    },
  ],
  },
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
