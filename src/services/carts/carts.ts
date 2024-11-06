import { Server } from "../axios.setting";
import { AddCartItemResponseType, DeleteCartItemResponseType, GetAllMyCartsResponseType, PatchCartItemResponseType } from "./carts.type";

export const getAllMyCarts = async (): Promise<GetAllMyCartsResponseType> => {
  const response = await Server.get("/carts");
  return response.data;
}

export const addCartItem = async (itemId: number, itemCount: number): Promise<AddCartItemResponseType> => {
  const response = await Server.post("/carts", { itemId, itemCount });
  return response.data;
}

export const patchCartItem = async (cartId: number, itemCount: number): Promise<PatchCartItemResponseType> => {
  const response = await Server.patch(`/carts/${cartId}`, { itemCount });
  return response.data;
}

export const deleteCartItem = async (cartId: number): Promise<DeleteCartItemResponseType> => {
  try {
    const response = await Server.delete(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}