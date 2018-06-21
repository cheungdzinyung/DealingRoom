export interface IUserData {
  id: number;
  username: string;
  password: string;
  displayName: string;
  userPhoto: string;
  facebookToken: string;
  role: string;
  isActive: boolean;
}

export interface IItemData{
  id: number,
  itemName: string,
  itemStock: number,
  categoryName: string,
  minimumPrice: number,
  currentPrice: number,
  itemPhoto: string,
  itemDescription: string,
  isSpecial: boolean,
  isActive: boolean
}

export interface IOrderData{
  id: number,
  users_id: number,
  table: number,
  status: string,
  isPaid: string,
  created_at: number,
  updated_at: number
}
