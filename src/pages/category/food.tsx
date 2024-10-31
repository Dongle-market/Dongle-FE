// /category/food/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCategoryData } from '@/services/api/categoryAPI';

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

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20.5px 8px;
  overflow-x: auto;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: lightgray;
  }
`;

const Item = styled.div<{ $isSelected?: boolean }>`
  padding: 0 8px;
  border-radius: 4px;
  flex-shrink: 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ $isSelected }) => ($isSelected ? "black" : "gray")};
  position: relative;
  &:after {
    content: '';
    display: ${({ $isSelected }) => ($isSelected ? "block" : "none")};
    position: absolute;
    bottom: -20.5px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: black;
    z-index: 2;
  }
`;


export default function FoodPage() {
  const router = useRouter();
  const { species = 'dog', sub = 'all' } = router.query;
  
  const speciesValue = Array.isArray(species) ? species[0] : species;
  const subValue = Array.isArray(sub) ? sub[0] : sub;
  
  const [category, setCategory] = useState("전체");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (speciesValue && subValue) {
      const fetchData = async () => {
        try {
          const data = await fetchCategoryData(speciesValue, subValue);
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }
  }, [speciesValue, subValue]);

  const filters = [
    { id: "animal", options: ["강아지", "고양이"] },
    { id: "sort", options: ["추천순", "최신순"] },
  ];

  const categoryOptions = [
    { label: "전체", sub: "all" },
    { label: "습식사료", sub: "wet" },
    { label: "소프트사료", sub: "soft" },
    { label: "건식사료", sub: "dry" }
  ];

  
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({
    animal: "강아지",
    sort: "추천순",
  });
  
  const handleSelectChange = (id: string, value: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (sub: string) => {
    router.push(`/category/food?species=${speciesValue}&sub=${sub}`);
  };

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < products.length; i += 2) {
      result.push(products.slice(i, i + 2));
    }
    return result;
  }, [products]);

  return (
    <div className="page">
      <Header title={"사료"} />
      <div className="content">
        {/* 카테고리 선택 표시 */}
        <Content>
          {categoryOptions.map(option => (
            <Item
              key={option.label}
              $isSelected={subValue === option.sub}
              onClick={() => handleCategoryChange(option.sub)}
            >
              {option.label}
            </Item>
          ))}
        </Content>

        {/* 필터링 및 정렬 컨트롤 */}
        <FilterContainer>
        {filters.map((filter) => (
          <SelectBox
            key={filter.id}
            options={filter.options}
            selectedOption={selectedItems[filter.id]}
            onChange={(value) => handleSelectChange(filter.id, value)}
          />
        ))}
        </FilterContainer>

        {/* 제품 리스트 */}
        <ProductListContainer>
          {rows.map((rowProducts, index) => (
            <ProductRow key={index} items={rowProducts} />
          ))}
        </ProductListContainer>
      </div>
      <FooterNav />
    </div>
  );
}
