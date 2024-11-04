import { ItemType } from "@/types/item";

export interface TossRequestType {
  amountValue: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerMobilePhone: string;
}

export interface OrderRequestType {
  receiverName: string;
  addr: string;
  addrDetail: string;
  phoneNumber: string;
  totalPrice: number;
  orderItems: ItemType[];
}

export interface OrderResponseType {
  userId: number;
  receiverName: string;
  status: string,
  addr: string;
  addrDetail: string;
  phoneNumber: string;
  totalPrice: number;
  orderId: number;
  orderDate: Date;
}