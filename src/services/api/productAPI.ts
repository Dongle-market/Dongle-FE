// services/ProductAPI.ts

import { Server } from '../axios.setting';

export class ProductAPI {
  static async fetchAllProducts() {
    const response = await Server.get('/item');
    return response.data;
  }

  static async fetchProductById(itemId: number) {
    const response = await Server.get(`/item/${itemId}`);
    return response.data;
  }

  // 다른 API 호출 메서드 추가 가능
}
