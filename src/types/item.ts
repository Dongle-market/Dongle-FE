export interface ItemType {
  itemId: number;
  itemCount: number;
  price: number;
}

export interface CartItemType extends ItemType {
  imageUrl: string;
  brand: string
  name: string;
};