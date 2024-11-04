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
    throw new Error();
  }
}

/*
{
    "receiverName": "심승보",
    "addr": "인천광역시 미추홀구 인하로105번길 46",
    "addrDetail": "진원룸 203호",
    "phoneNumber": "010-7664-6286",
    "totalPrice": 58000,
    "orderItems": [
        {
            "itemId": 21,
            "itemCount": 2,
            "price": 58000
        },
        {
            "itemId": 21,
            "itemCount": 2,
            "price": 58000
        }
    ]
}

 */