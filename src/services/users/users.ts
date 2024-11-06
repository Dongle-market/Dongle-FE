import { Server } from "../axios.setting";
import { UserResponse } from "./users.type";

export const getUserInfo = async (): Promise<UserResponse> => {
  try {
    const response = await Server.get('/user/my');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export const updateUserInfo = async (updateData: Partial<UserResponse>): Promise<UserResponse> => {
  try {
    const response = await Server.patch('/user', updateData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
