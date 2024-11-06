import { create } from "zustand";

interface UserAtomType {
  petId: number | null;
  cartCount: number;
  setPetId: (petId: number | null) => void;
  setCartCount: (count: number) => void;
}

export const useUserStore = create<UserAtomType>((set) => ({
  petId: null,
  cartCount: 0,
  setPetId: (petId: number | null) => set({ petId }),
  setCartCount: (cartCount: number) => set({ cartCount })  
}))