export interface ItemType {
  itemId: number;
  itemCount: number;
  price: number;
}

export interface ClientCartItemType extends ItemType {
  imageurl: string;
  brand: string
  name: string;
};

export interface CartItemType extends ItemType {
  cartId: number;
  imageurl: string;
  brand: string
  name: string;
};

export interface MainItemType {
  itemId: number;
  title: string;
  lprice: number;
  image: string;
}

export interface CategoryItemType {
  itemId: number;
  image: string;
  title: string;
  lprice: number;
  selectedPetIds?: number[];

}