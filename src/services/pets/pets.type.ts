//

export interface PetPostRequestType {
  petName: string;
  profileImg: number;
  type: string;
  gender: string;
  age: number;
}

export interface PetType {
  petId: number;
  petName: string;
  profileImg: number;
  type: string;
  gender: string;
  age: number;
  userId: number;
}

export interface OrderItemType {
  itemId: number;
  title: string;
  image: string;
  price: number;
  orderDate: string;
}

export interface PetEditType {
  petName: string;
  profileImg: number;
  gender: string;
  age: number;
}

export interface PetInfoResponseType {
  pet: PetType;
  orderItems: OrderItemType[];
}
