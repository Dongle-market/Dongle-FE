// // /services/ItemAPI.ts

// import { Server } from '../axios.setting';

// export class ItemAPI {
//   // 전체 제품 목록 가져오기
//   static async fetchAllItems() {
//     const response = await Server.get('/item');
//     return response.data;
//   }

//   // 제품 ID로 단일 제품 가져오기
//   static async fetchItemById(itemId: number) {
//     const response = await Server.get(`/item/${itemId}`);
//     return response.data;
//   }

//   // species, sub, category로 아이템 데이터 가져오기
//   static async fetchItemData(species: string, sub: string, category: string) {
//     try {
//       const response = await Server.get(`/item/${category}`, {
//         params: { species, sub },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to fetch item data");
//     }
//   }

//   static async fetchCategoryData(species: string, sub: string, order: string) {
//     try {
//       const response = await Server.get('/item/food', {
//         params: { species, sub, order },
//       });
//       return response.data; // 데이터만 반환
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to fetch category data");
//     }
//   }
// }


// newitem.ts

// /services/ItemAPI.ts

import { Server } from '../axios.setting';

export class ItemAPI {
  // 전체 제품 목록 가져오기
  static async fetchAllItems() {
    const response = await Server.get('/item');
    return response.data;
  }

  // 제품 ID로 단일 제품 가져오기
  static async fetchItemById(itemId: number) {
    const response = await Server.get(`/item/${itemId}`);
    return response.data;
  }

  // species와 category에 따라 아이템 데이터 가져오기 (order 기본값 설정 포함)
  static async fetchItemData(sub: string) {
    try {
      // category와 species 값을 강제 설정
      const response = await Server.get(`/item/food`, {
      params: { species: 'dog', sub },

    });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch item data");
    }
  }

  static async fetchCategoryData(sub: string, species: string = 'dog', order: string = 'asc') {
    try {
      const finalOrder = species === 'cat' ? 'low' : order; // cat일 경우 order=low
      const response = await Server.get(`/item/food`, {
        params: { species, sub, order: finalOrder },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch category data");
    }
  }
}
