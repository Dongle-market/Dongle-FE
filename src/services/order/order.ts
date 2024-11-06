// services/order/order.ts
import { Server } from "../axios.setting";
import { Order } from "./order.type";

// 주문 정보를 가져오는 함수
export const getOrderInfo = async (): Promise<Order[]> => {
  try {
    const response = await Server.get<Order[]>('/order/my');
    return response.data; // 바로 Order[] 타입으로 반환
  } catch {
    throw new Error("Failed to fetch order data");
  }
}

// 개별 주문 항목 취소 함수
export const cancelOrderItem = async (orderItemId: number): Promise<void> => {
  try {
    const response = await Server.delete(`/order/item/${orderItemId}`);
    console.log('Order item deleted successfully:', response.data);
    return response.data;
  } catch {
    throw new Error("Failed to delete order item");
  }
}