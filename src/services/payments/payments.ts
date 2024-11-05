import { Server } from "../axios.setting";
import { OrderRequestType, OrderResponseType } from "./payments.type";

export const postOrder = async (orderData: OrderRequestType): Promise<OrderResponseType> => {
  try {
    if (!Array.isArray(orderData.orderItems)) {
      orderData.orderItems = Object.values(orderData.orderItems);
    }
    
    const response = await Server.post('/order', orderData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export const patchOrderStatus = async (orderId: number) => {
  try {
    const response = await Server.patch(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}