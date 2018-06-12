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



export interface IPureItemLine {
    itemName: string
    ice: ItemModification
    sweetness: ItemModification
    garnish: ItemModification
    purchasePrice: number

}

export interface IPureOrder {
    users_id: number
    userName: string
    displayName: string
    orders_id: number
    table: number
    status: OrderStatus
    isPaid: boolean
    orderItems: IPureItemLine[]
}

export interface IPureUserOrder {
    orders_id: number
    table: number
    status: OrderStatus
    isPaid: boolean
    orderingTime: number
    orderTotal: number
    orderItems: IPureItemLine[]
}

export interface IPureUsersOrderList {
    users_id: number
    userName: string
    displayName: string
    orders: IPureUserOrder[]

}