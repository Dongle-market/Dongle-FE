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
  petId: number;
  cartCount: number;
}