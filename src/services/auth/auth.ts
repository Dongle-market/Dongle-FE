import { Server } from "../axios.setting"
import { LoginRequest } from "./auth.types";

export const login = async (authCode: LoginRequest) => {
  try {
    const response = await Server.post('/auth/login', authCode);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}