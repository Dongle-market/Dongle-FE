export interface ItemType {
  itemId: number;
  itemCount: number;
  price: number;
}

export interface CartItemType extends ItemType {
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