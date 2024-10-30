// /category/food/page.tsx
'use client';

import { useState, useMemo } from 'react';
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

const dummyProducts = [
  { id: 1, imageUrl: "https://shopping-phinf.pstatic.net/main_3752457/37524570621.20230130114937.jpg", name: "잘먹잘싸 강아지사료 기호성좋은 연어", price: 23900 },
  { id: 2, imageUrl: "https://shopping-phinf.pstatic.net/main_8398538/83985387325.21.jpg", name: "강아지 사료 눈물 가수분해 피부 알러지 말티즈 비숑 푸들 라비앙독 연어", price: 20900 },
  { id: 3, imageUrl: "https://shopping-phinf.pstatic.net/main_1564506/15645061501.20240411092625.jpg", name: "로얄캐닌 하이포알러제닉 스몰독", price: 21960 },
  { id: 4, imageUrl: "https://shopping-phinf.pstatic.net/main_1456236/14562361991.20240903141927.jpg", name: "NOW 그레인프리 스몰브리드 시니어", price: 19980 },
  { id: 5, imageUrl: "https://shopping-phinf.pstatic.net/main_8358452/83584527138.7.jpg", name: "슈퍼벳 리퀴드잇 노령견 강아지 습식사료 액상사료 회복식 노견", price: 29000 },
  { id: 6, imageUrl: "https://shopping-phinf.pstatic.net/main_1140991/11409916892.24.jpg", name: "나우 눈물 사료 프레쉬 스몰브리드 어덜트", price: 39000 },
  { id: 7, imageUrl: "https://shopping-phinf.pstatic.net/main_1232582/12325828530.20240903142042.jpg", name: "NOW 그레인프리 스몰브리드 어덜트", price: 22700 },
  { id: 8, imageUrl: "https://shopping-phinf.pstatic.net/main_3095766/30957669618.20240829092620.jpg", name: "본아페티 강아지 다이어트 관절 소프트 반습식 사료", price: 18800 },
];


export default function FoodPage() {
  const [category, setCategory] = useState("전체");
  const [products, setProducts] = useState(dummyProducts);
  const filters = [
    { id: "animal", options: ["강아지", "고양이"] },
    { id: "sort", options: ["추천순", "최신순"] },
  ];

  const categoryOptions = ["전체", "수제간식", "빵/케이크", "뼈간식", "껌"];

  
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({
    animal: "강아지",
    sort: "추천순",
  });
  
  const handleSelectChange = (id: string, value: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: value }));
  };
  const handleCategoryChange = (option: string) => {
    setCategory(option);
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
      <Header title={"간식"}/>
      <div className="content">
        {/* 카테고리 선택 표시 */}
        <Content>
            {categoryOptions.map(option => (
            <Item
                key={option}
                $isSelected={category === option}
                onClick={() => handleCategoryChange(option)}
            >
                {option}
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
