// services/order/order.type.ts

import { PetType } from "../pets/pets.type";

// 주문 항목에 대한 인터페이스
export interface OrderItem {
  orderItemId: number;
  itemId: number;
  title: string;
  image: string;
  price: number;
  itemCount: number;
  pets: number[];
}

// 주문에 대한 인터페이스
export interface Order {
  orderId: number;
  userId: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  receiverName: string;
  addr: string;
  addrDetail: string;
  phoneNumber: string;
  orderItems: OrderItem[];
}

export interface AddPetToOrderItemResponseType {
  orderItemId: number;
  orderId: number;
  itemId: number;
  price: number;
  itemCount: number;
  pets: PetType[];
}