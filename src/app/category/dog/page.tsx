// category/dog/[categoryId] page.tsx
'use client'

import Header from "@/components/layout/CategoryDetailHeader";
import FooterNav from "@/components/layout/CategoryFooterNav";
import ArrowSvg from "/public/svgs/down_arrow.svg"
import styled from "styled-components";
import { useState, useRef } from "react";

interface Itemprops {
    $isSelected? : boolean;
}

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
    background-color: lightgray;  /* 회색 줄 */
  }
`;

const Item = styled.div<Itemprops>`
  padding: 0 8px;
  border-radius: 4px;
  flex-shrink: 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ $isSelected }) => ($isSelected ? "black" : "gray")};  /* 선택 시 검은색, 아니면 회색 */
  position: relative;
  &:after {
    content: '';
    display: ${({ $isSelected }) => ($isSelected ? "block" : "none")}; /* 선택된 경우에만 검은색 줄 표시 */
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
    gap: 16px;  /* Selectbox들 사이 간격 */
`;

const SelectBoxContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    border: 1px solid gray;
    border-radius: 24px;
    position: relative;
    gap: 12px;  /* 텍스트와 화살표 사이에 12px 간격 추가 */
`;

const Select = styled.select`
    appearance: none;
    border: none;
    background: transparent;
    font-size: 12px;
    cursor: pointer;
`;

const Arrow = styled.div`
    display: flex;
    cursor: pointer; /* 클릭 가능하도록 설정 */
`;

export default function Home() {
    const [selectedItem, setSelectedItem] = useState("전체");
    const firstSelectRef = useRef<HTMLSelectElement>(null);
    const secondSelectRef = useRef<HTMLSelectElement>(null);

    // Arrow 클릭 시 select box 열리도록 하는 함수
    const openSelectBox = (selectRef: React.RefObject<HTMLSelectElement>) => {
        if (selectRef.current) {
            selectRef.current.focus(); // 클릭하면 select box 포커스를 줌으로써 드롭다운이 열리게 함
        }
    };

  return (
    <div className="page">
      <Header />
      <Content>
        {["전체", "습식사료", "소프트사료", "건식사료"].map((item) => (
          <Item
            key={item}
            $isSelected={selectedItem === item}
            onClick={() => setSelectedItem(item)}
          >
            {item}
            </Item>
         ))}
       </Content>
      <FilterContainer>
      <SelectBoxContainer>
          <Select ref={firstSelectRef}>
            <option value="전체">전체</option>
            <option value="습식사료">습식사료</option>
            <option value="소프트사료">소프트사료</option>
            <option value="건식사료">건식사료</option>
          </Select>
          <Arrow onClick={() => openSelectBox(firstSelectRef)}>
            <ArrowSvg/>
          </Arrow>
        </SelectBoxContainer>

        <SelectBoxContainer>
          <Select ref={secondSelectRef}>
            <option value="추천순">추천순</option>
            <option value="최신순">최신순</option>
          </Select>
          <Arrow onClick={() => openSelectBox(secondSelectRef)}>
            <ArrowSvg/>
          </Arrow>
        </SelectBoxContainer>
      </FilterContainer>
       <FooterNav />
     </div>
   );
}
