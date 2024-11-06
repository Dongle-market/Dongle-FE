// services/order/order.ts
import { Server } from "../axios.setting";
import { Order } from "./order.type";

// 주문 정보를 가져오는 함수
export const getOrderInfo = async (): Promise<Order[]> => {
  try {
    const response = await Server.get<Order[]>('/order/my');
    return response.data; // 바로 Order[] 타입으로 반환
  } catch (error) {
    throw new Error("Failed to fetch order data");
  }
}