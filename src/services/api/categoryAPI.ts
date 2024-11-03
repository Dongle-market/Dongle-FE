// /services/categoryAPI.ts

import { Server } from '../axios.setting';

export async function fetchCategoryData(species: string, sub: string) {
    try {
      const response = await Server.get('/item/food', {
        params: { species, sub },
      });
      return response.data; // 데이터만 반환
    } catch (error) {
      throw new Error("Failed to fetch category data");
    }
  }
