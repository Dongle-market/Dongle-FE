// categry/dog/page.tsx

'use client';

import Header from "@/components/header/CategoryDetailHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import ProductRow from "@/components/items/CategoryItemsRow";
import ArrowSvg from "/public/svgs/element/down_arrow.svg";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

interface Itemprops {
    $isSelected?: boolean;
}

const ProductListContainer = styled.div`
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 100px;
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

const Item = styled.div<Itemprops>`
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

const FilterContainer = styled.div`
    padding: 16px;
    display: flex;
    gap: 8px;
`;

const SelectBoxContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    border: 1px solid gray;
    border-radius: 30px;
    position: relative;
`;

const Select = styled.select`
    appearance: none;
    border: none;
    background: transparent;
    font-size: 12px;
    cursor: pointer;
    color: black;
    text-decoration: none;
`;

const Arrow = styled.div`
    display: flex;
    cursor: pointer;
`;

export default function Home() {
  const filters = [
    { id: "category", options: ["전체", "습식사료", "소프트사료", "건식사료"] },
    { id: "sort", options: ["추천순", "최신순"] }
  ];

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({
    category: "전체",
    sort: "추천순"
  });
  const [selectWidths, setSelectWidths] = useState<{ [key: string]: number }>({
    category: 50,
    sort: 50
  });

  const selectRefs = useRef<{ [key: string]: HTMLSelectElement | null }>({
    category: null,
    sort: null
  });

  const adjustSelectWidth = (id: string) => {
    const selectRef = selectRefs.current[id];
    if (selectRef) {
      const selectedOption = selectRef.options[selectRef.selectedIndex];
      const tempSpan = document.createElement("span");
      tempSpan.style.fontSize = "12px";
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.innerText = selectedOption.text;
      document.body.appendChild(tempSpan);

      const newWidth = tempSpan.offsetWidth + 12;
      setSelectWidths(prevWidths => ({ ...prevWidths, [id]: newWidth }));
      document.body.removeChild(tempSpan);
    }
  };

  useEffect(() => {
    filters.forEach(filter => adjustSelectWidth(filter.id));
  }, [selectedItems]); // selectedItems가 변경될 때마다 adjustSelectWidth 호출

  const handleSelectChange = (id: string, value: string) => {
    setSelectedItems(prevItems => ({ ...prevItems, [id]: value }));
  };

  const openSelectBox = (id: string) => {
    const selectRef = selectRefs.current[id];
    if (selectRef) {
      selectRef.focus();
    }
  };

  const products = [
    { id: 1, imageUrl: "https://shopping-phinf.pstatic.net/main_3752457/37524570621.20230130114937.jpg", name: "잘먹잘싸 강아지사료 기호성좋은 연어", price: 23900 },
    { id: 2, imageUrl: "https://shopping-phinf.pstatic.net/main_8398538/83985387325.21.jpg", name: "강아지 사료 눈물 가수분해 피부 알러지 말티즈 비숑 푸들 라비앙독 연어 1.8kg", price: 20900 },
    { id: 3, imageUrl: "https://shopping-phinf.pstatic.net/main_1564506/15645061501.20240411092625.jpg", name: "로얄캐닌 하이포알러제닉 스몰독", price: 21960 },
    { id: 4, imageUrl: "https://shopping-phinf.pstatic.net/main_1456236/14562361991.20240903141927.jpg", name: "NOW 그레인프리 스몰브리드 시니어", price: 19980 },
    { id: 5, imageUrl: "https://shopping-phinf.pstatic.net/main_8358452/83584527138.7.jpg", name: "슈퍼벳 리퀴드잇 노령견 강아지 습식사료 액상사료 회복식 노견 200ml 5개", price: 29000 },
    { id: 6, imageUrl: "https://shopping-phinf.pstatic.net/main_1140991/11409916892.24.jpg", name: "나우 눈물 사료 프레쉬 스몰브리드 어덜트 2.72kg", price: 39000 },
    { id: 7, imageUrl: "https://shopping-phinf.pstatic.net/main_1232582/12325828530.20240903142042.jpg", name: "NOW 그레인프리 스몰브리드 어덜트", price: 22700 },
    { id: 8, imageUrl: "https://shopping-phinf.pstatic.net/main_3095766/30957669618.20240829092620.jpg", name: "본아페티 강아지 다이어트 관절 소프트 반습식 사료", price: 18800 },
];

    // products 배열을 두 개씩 나누어 rows 배열로 생성
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
        rows.push(products.slice(i, i + 2));
    }

  return (
    <div className="page">
      <Header />
      <Content>
        {filters[0].options.map(item => (
          <Item
            key={item}
            $isSelected={selectedItems["category"] === item}
            onClick={() => handleSelectChange("category", item)}
          >
            {item}
          </Item>
        ))}
      </Content>
      <FilterContainer>
        {filters.map(filter => (
          <SelectBoxContainer key={filter.id}>
            <Select
              ref={(el) => { selectRefs.current[filter.id] = el; }}
              value={selectedItems[filter.id]}
              onChange={(e) => handleSelectChange(filter.id, e.target.value)}
              style={{ width: `${selectWidths[filter.id]}px` }}
            >
              {filter.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <Arrow onClick={() => openSelectBox(filter.id)}>
              <ArrowSvg />
            </Arrow>
          </SelectBoxContainer>
        ))}
      </FilterContainer>
      <ProductListContainer>
        {rows.map((rowProducts, index) => (
            <ProductRow key={index} items={rowProducts} />
        ))}
      </ProductListContainer>
      <FooterNav />
    </div>
  );
}
