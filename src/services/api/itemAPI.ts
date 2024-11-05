// /services/itemAPI.ts

import { Server } from '../axios.setting';

export async function fetchItemData(species: string, sub: string, category: string) {
    try {
      // 동적으로 category 값을 경로에 사용
      const response = await Server.get(`/item/${category}`, {
        params: { species, sub },
      });
      return response.data; // 데이터만 반환
    } catch (error) {
      throw new Error("Failed to fetch item data");
    }
}

