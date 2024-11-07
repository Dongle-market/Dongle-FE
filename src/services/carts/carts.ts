import { Server } from "../axios.setting";
import { AddCartItemResponseType, DeleteCartItemResponseType, GetAllMyCartsResponseType, PatchCartItemResponseType } from "./carts.type";

export const getAllMyCarts = async (): Promise<GetAllMyCartsResponseType> => {
  const response = await Server.get("/cart");
  return response.data;
}

export const addCartItem = async (itemId: number, itemCount: number): Promise<AddCartItemResponseType> => {
  try {
    const response = await Server.post("/cart", { itemId, itemCount });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export const patchCartItem = async (cartId: number, itemCount: number): Promise<PatchCartItemResponseType> => {
  try {
    const response = await Server.patch(`/cart/${cartId}`, { itemCount });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }

}

export const deleteCartItem = async (cartId: number): Promise<DeleteCartItemResponseType> => {
  try {
    const response = await Server.delete(`/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}