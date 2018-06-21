// Item modification types
const NORMAL = "normal";
type NORMAL = typeof NORMAL;
const LESS = "less";
type LESS = typeof LESS;
const WITHOUT = "without";
type WITHOUT = typeof WITHOUT;
const EXTRA = "extra";
type EXTRA = typeof EXTRA;

export type ModificationType = NORMAL | LESS | WITHOUT | EXTRA;

const ORDERED = "ordered";
type ORDERED = typeof ORDERED;
const CONFIRMED = "confirmed";
type CONFIRMED = typeof CONFIRMED;
const MADE = "made";
type MADE = typeof MADE;
const SERVED = "served";
type SERVED = typeof SERVED;
const CANCELLED = "cancelled";
type CANCELLED = typeof CANCELLED;

export type OrderStatus = ORDERED | CONFIRMED | MADE | SERVED | CANCELLED;

const ALL = "all"
type ALL = typeof ALL;

export type ActiveSpecialFilter = ALL | boolean;

// All acceptable image types
// export type ImageExt = "*.jpg" | "*.png" | "*.jpeg" | string;


/*
Corresponding API path: api/item/????
for adding and editing menu items
*/
// current price === starting price
// item_id is generated in backend
export interface ICreateMenuItem {
  itemName: string,
  itemStock: number,
  categoryName: string,
  itemDescription: string,
  minimumPrice: number,
  currentPrice: number,        
  itemPhoto: any,
  isSpecial: boolean,
  isActive: boolean,
}

// id and current price is untouched
export interface IEditMenuItem {
  items_id: number,
  itemName: string,
  itemStock: number,
  categoryName: string,
  itemDescription: string,
  minimumPrice: number,
  itemPhoto: any,
  isSpecial: boolean,
  isActive: boolean,
}



/*
Corresponding API path: api/order/:orderid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersorderid5d/retreiving-order-information-by-order-id
 */
export interface IPureItemLine {
  items_id: number;
  itemName: string;
  purchasePrice: number;
  ice: ModificationType;
  sweetness: ModificationType;
  garnish: ModificationType;
  
}

/*
Corresponding API path: api/order/:orderid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersorderid5d/retreiving-order-information-by-order-id
 */
export interface IPureOrder {
  users_id: number;
  userName: string;
  displayName: string;
  orders_id: number;
  table: number;
  status: OrderStatus;
  isPaid: boolean;
  orderTotal: number;
  orderItems: IPureItemLine[];
}

/*
Corresponding API path: api/orders/user/:userid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersuseruserid5d/retreiving-orders-information-by-user-id
 */
export interface IPureUserOrder {
  orders_id: number;
  table: number;
  status: OrderStatus;
  isPaid: boolean;
  orderingTime: number;
  orderTotal: number;
  orderItems: IPureItemLine[];
}

/*
Corresponding API path: api/orders/user/:userid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersuseruserid5d/retreiving-orders-information-by-user-id
 */
export interface IPureUsersOrderList {
  users_id: number;
  username: string;
  displayName: string;
  orders: IPureUserOrder[];
}

/* 
Corresponding API path: api/items
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiitems5d/obtaining-all-item's-information
*/
export interface IMenuCategoryWithFlux {
  categoryName: string;
  categoryPhoto: string;
  items: IMenuItemWithFlux[];
}

export interface IMenuCategoryWithoutFlux{
  categoryName: string;
  categoryPhoto: string;
  items: IMenuItemWithoutFlux[];
}

/*
Corresponding API path: api/items/?fluctuation=YYYY-MM-DD&category=<category>
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiitems5d/obtaining-all-item's-information
 */

export interface IMenuItemWithoutFlux {
  items_id: number;
  itemName: string;
  itemStock: number;
  categoryName: string;
  itemDescription: string;
  minimumPrice: number;
  currentPrice: number;
  itemPhoto: any;
  isSpecial: boolean;
  isActive: boolean;
}
export interface IMenuItemWithFlux extends IMenuItemWithoutFlux{
  chartData: IItemPriceGraphData[];
}

// New line graph data format
export interface IItemPriceGraphData{
  time: string
  purchasePrice: number
}

/* 
Corresponding API path POST: api/orders/user/:id
*/
// each item in shopping cart
export interface IRequestItem {
  thisItemID: number,
  items_id: number,
  itemName: string,
  ice: ModificationType,
  sweetness: ModificationType,
  garnish: ModificationType,
  purchasePrice: number,
}
// the shopping cart
// this is for when send to BE
export interface ICurrentOrder {
  users_id: number,
  table: number,
  status: OrderStatus,
  item: IRequestItem[],
}


/* 
Corresponding API path GET: api/users/

*/
export interface IUserProfile {
  users_id: number,
  username: string,
  password: string,
  displayName: string,
  userPhoto: string,
  role: string,
}

export interface ISignUpPackage {
  displayName: string,
  username: string,
  password: string,
  role: "manager" | "bartender" | "waiter" | "customer",
}

export interface ILoginPackage {
  username: string,
  password: string,
}











// store state for ref
// interface IUserState {
//   role: string,
//   isAuth: boolean,
//   currentPage: string,
//   redirectTarget: string,
//   settings: string,
// }

// interface IOrdersState {
//   ordersList: any,
//   unpaidOrders: number,
//   currentOrder: IRequestItem[],
//   currentTotal: number,
// }





