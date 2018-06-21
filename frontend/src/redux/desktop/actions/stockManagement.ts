// Importing modules
import { Action } from "redux";

// Type creation
const ADD_STOCK = "ADD_STOCK";
type ADD_STOCK = typeof ADD_STOCK;

const UNFAV_STOCK = "UNFAV_STOCK";
type UNFAV_STOCK = typeof UNFAV_STOCK;

const FAV_STOCK = "FAV_STOCK";
type FAV_STOCK = typeof FAV_STOCK;

const INACTIVE_STOCK = "INACTIVE_STOCK";
type INACTIVE_STOCK = typeof INACTIVE_STOCK;

const ACTIVE_STOCK = "ACTIVE_STOCK";
type ACTIVE_STOCK = typeof ACTIVE_STOCK;

// Combined types
export type StockManipulation =
  | ADD_STOCK
  | UNFAV_STOCK
  | FAV_STOCK
  | INACTIVE_STOCK
  | ACTIVE_STOCK;

export interface IAddStock extends Action {
  type: StockManipulation;
  itemName: string;
  itemStock: number;
  minimumPrice: number;
  currentPrice: number;
  itemPhoto: any;
  isSpecial: boolean;
  isActive: boolean;
  itemDescription: string;
}

export interface IStockFav extends Action {
  type: StockManipulation;
  items_id: number;
}

export interface IStockActive extends Action {
  type: StockManipulation;
  items_id: number;
}
