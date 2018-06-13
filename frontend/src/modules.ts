// Item modification types
const NORMAL = "normal";
type NORMAL = typeof NORMAL;
const LESS = "less";
type LESS = typeof LESS;
const WITHOUT = "without";
type WITHOUT = typeof WITHOUT;
const EXTRA = "extra";
type EXTRA = typeof EXTRA;

export type ItemModification = NORMAL | LESS | WITHOUT | EXTRA;

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

/*
Corresponding API path: api/order/:orderid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersorderid5d/retreiving-order-information-by-order-id
 */
export interface IPureItemLine {
  itemName: string;
  ice: ItemModification;
  sweetness: ItemModification;
  garnish: ItemModification;
  purchasePrice: number;
  item_id: number;
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
  userName: string;
  displayName: string;
  orders: IPureUserOrder[];
}

/*
Corresponding API path: api/order/:orderid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersorderid5d/retreiving-order-information-by-order-id
 */
export interface IGraphSingleDataSet {
  label: string;
  backgroundColor: string;
  strokeColor: string;
  pointColor: string;
  pointStrokeColor: string;
  pointHighlightFill: string;
  pointHighlightStroke: string;
  data: number[];
}

/*
Corresponding API path: api/order/:orderid
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiordersorderid5d/retreiving-order-information-by-order-id
 */
export interface IGraphDataCombiner {
  labels: string[];
  datasets: IGraphSingleDataSet[];
}

/* Corresponding to no API, but to the graph data that 1 line item on the menu should come along with*/
export interface IItemFluctuationDataSet {
  backgroundColor: string;
  borderColor: string;
  borderJoinStyle: string;
  data: number[];
  fill: boolean;
  label: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointBorderWidth: number;
  pointRadius: number;
  strokeColor: string;
}

export interface IItemFluctuationDataCombiner {
  labels: string[];
  datasets: IItemFluctuationDataSet[];
}

/*
Corresponding API path: api/items
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiitems5d/obtaining-all-item's-information
 */
export interface IPureMenuItemWithFlux {
  item_id: number;
  itemName: string;
  itemStock: number;
  minimumPrice: number;
  currentPrice: number;
  itemPhoto: any;
  itemDescription: string;
  isSpecial: boolean;
  isActive: boolean;
  chartData: IItemFluctuationDataCombiner;
}

/* 
Corresponding API path: api/items
URL: https://dealingroom.docs.apiary.io/#reference/0/5bapiitems5d/obtaining-all-item's-information
*/

export interface IPureCategoryWithItem {
  categoryName: string;
  categoryPhoto: string;
  items: IPureMenuItemWithFlux;
}
