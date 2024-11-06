import { CartType } from "../carts/carts.type";
import { PetType } from "../pets/pets.type";

export interface UserResponse {
  userId: number;
  userName: string;
  kakaoId: string;
  profilePic?: string;
  addr?: string;
  addrDetail?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  pets: PetType[];
  carts: CartType[];
}