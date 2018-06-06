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