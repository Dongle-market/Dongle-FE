import { Server } from "../axios.setting";
import { PetPostRequestType } from "./pets.type";

export const postPet = async (petData: PetPostRequestType) => {
  try {
    console.log(petData);
    /*  (Response 응답)      ( Request 요청 ) */
    // 1. 시도하는 부분
    const response = await Server.post("/pet", petData);

    // 너 실패하면? else 가셈 

    // 2. 성공한 부분
    return response.data;
  } catch (error) {
    // 어 나 실패... else 옴
    throw new Error();
  }
};
