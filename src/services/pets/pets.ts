import { Server } from "../axios.setting";
import { PetPostRequestType } from "./pets.type";

export const postPet = async (petData: PetPostRequestType) => {
  try {
    console.log(petData);
    const response = await Server.post("/pet", petData);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
