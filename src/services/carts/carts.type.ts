export interface CartType {
  cartId: number;
  itemCount: number;
}

export interface CartItemType {
  itemId: number;
  categoryId: number;
  title: string;
  lprice: number;
  hprice: number;
  mallName: string;
  brand: string;
  count: number;
}

export interface GetAllMyCartsResponseType extends CartType {
  item: CartItemType;
}

export interface AddCartItemResponseType extends CartType {
  userId: number;
  itemId: number;
}

export interface PatchCartItemResponseType extends CartType {}

export interface DeleteCartItemResponseType {
  message: string;
}