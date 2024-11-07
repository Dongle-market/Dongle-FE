export interface CartType {
  cartId: number;
  itemCount: number;
}

export interface CartItemType {
  itemId: number;
  categoryId: number;
  title: string;
  image: string;
  lprice: number;
  hprice: number;
  mallName: string;
  brand: string;
  count: number;
}

export interface MyCartType extends CartType {
  item: CartItemType;
}

export interface GetAllMyCartsResponseType {
  carts: MyCartType[];
  cartCount: number;
}

export interface AddCartItemResponseType extends CartType {
  cartCount: number;
}

export interface PatchCartItemResponseType extends CartType {}

export interface DeleteCartItemResponseType {
  message: string;
  cartCount: number;
}