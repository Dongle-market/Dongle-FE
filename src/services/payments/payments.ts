import { Server } from "../axios.setting";
import { OrderRequestType } from "./payments.type";

export const postOrder = async (orderData: OrderRequestType) => {
  try {
    const response = await Server.post('/order', orderData);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}