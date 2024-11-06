import { Server } from "../axios.setting";
import { PetPostRequestType, PetType } from "./pets.type";
import { PetInfoResponseType } from "./pets.type";

export const getPets = async (): Promise<PetType[]> => {
  try {
    const response = await Server.get("/pet/my");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch pet list.");
  }
};

export const postPet = async (petData: PetPostRequestType) => {
  try {
    const response = await Server.post("/pet", petData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const getPetInfo = async (
  petId: number
): Promise<PetInfoResponseType> => {
  try {
    const response = await Server.get(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const patchPet = async (petId: number, petData: PetPostRequestType) => {
  try {
    const response = await Server.patch(`/pet/${petId}`, petData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const DeletePet = async (petId: number): Promise<void> => {
  try {
    await Server.delete(`/pet/${petId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed the delete pet");
  }
};
