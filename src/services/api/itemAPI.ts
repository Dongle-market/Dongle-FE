// /services/itemAPI.ts

import { Server } from '../axios.setting';

export async function fetchItemData() {
    try {
      const response = await Server.get('/item');
      return response.data; // 데이터만 반환
    } catch (error) {
      throw new Error("Failed to fetch item data");
    }
}
