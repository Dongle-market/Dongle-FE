// /category/food/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/header/CategoryDetailHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import ProductRow from "@/components/items/CategoryItemsRow";
import SelectBox from "@/components/header/SelectBox";
import styled from 'styled-components';

const ProductListContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const dummyProducts = [
  { id: 1, imageUrl: "url1", name: "소프트 사료 1", price: 10000 },
  { id: 2, imageUrl: "url2", name: "건식 사료 2", price: 20000 },
  // 추가 데이터
];

export default function FoodPage() {
  const [animalType, setAnimalType] = useState("dog");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState(dummyProducts);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`/api/category/food?type=${animalType}&category=${category}`);
      const data = await response.json();
      setProducts(data);
    }
    
    if (category !== "all") {
      fetchProducts();
    } else {
      setProducts(dummyProducts); // 기본 더미 데이터 사용
    }
  }, [animalType, category]);

  return (
    <div>
      <Header />
      
      {/* 필터링을 위한 SelectBox 컴포넌트 */}
      <SelectBox
        label="Animal Type"
        options={["dog", "cat"]}
        selectedOption={animalType}
        onChange={(value) => setAnimalType(value)}
      />
      <SelectBox
        label="Category"
        options={["all", "wet", "soft", "dry"]}
        selectedOption={category}
        onChange={(value) => setCategory(value)}
      />

      <ProductListContainer>
        <ProductRow items={products} /> {/* products 배열 전체를 items로 전달 */}
      </ProductListContainer>
      
      <FooterNav />
    </div>
  );
}
