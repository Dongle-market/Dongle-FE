// /category/food/page.tsx

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ItemAPI } from '@/services/item/item';

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
  const { species = 'dog', sub = '', order = '' } = router.query;

  const speciesValue = Array.isArray(species) ? species[0] : species;
  const subValue = Array.isArray(sub) ? sub[0] : sub;
  const orderValue = Array.isArray(order) ? order[0] : order;

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({
    animal: speciesValue === 'cat' ? '고양이' : '강아지',
    sort: "가격순",
  });

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // cat일 때도 dog 데이터를 요청하고, 정렬 방식은 다르게 적용
        const finalSpecies = speciesValue === "cat" ? "dog" : speciesValue;
        const finalOrder = speciesValue === "cat" && orderValue === "" ? "low" : orderValue;
        const data = await ItemAPI.fetchCategoryData(subValue, finalSpecies, finalOrder);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [speciesValue, subValue, orderValue]);
  

  // 동물에 따른 카테고리 옵션 설정
  const categoryOptions = speciesValue === 'cat'
    ? [
        { label: "전체", sub: "" },
        { label: "캔/통조림", sub: "soft" },
        { label: "건식사료", sub: "dry" },
        { label: "습식사료", sub: "wet" },
        // { label: "에어/동결사료", sub: "soft" },
      ]
    : [
        { label: "전체", sub: "" },
        { label: "습식사료", sub: "wet" },
        { label: "소프트사료", sub: "soft" },
        { label: "건식사료", sub: "dry" },
      ];

  const filters = [
    { id: "animal", options: ["강아지", "고양이"] },
    { id: "sort", options: ["가격순", "저가순", "고가순"] },
  ];

  const handleSelectChange = (id: string, value: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: value }));
    if (id === "animal") {
      setSelectedItems((prev) => ({ ...prev, sort: "가격순" }));
      if (value === "강아지") {
        router.push(`/category/food`);
      } else {
        router.push(`/category/food?species=cat`);
      }
    }
    if (id === "sort") {
      const order = value === "저가순" ? "low" : value === "고가순" ? "high" : "default";
      const baseURL = `/category/food?species=${speciesValue}`;
      const subParam = subValue !== '' ? `&sub=${subValue}` : '';
      const orderParam = order !== 'default' ? `&order=${order}` : '';
      router.push(`${baseURL}${subParam}${orderParam}`);
    }
  };

  const handleCategoryChange = (sub: string) => {
    setSelectedItems((prev) => ({ ...prev, sort: "가격순" }));
    const url = sub === '' ? `/category/food?species=${speciesValue}` : `/category/food?species=${speciesValue}&sub=${sub}`;
    router.push(url);
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
