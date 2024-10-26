// categry/dog/page.tsx

'use client';

import Header from "@/components/header/CategoryDetailHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import ArrowSvg from "/public/svgs/down_arrow.svg";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

interface Itemprops {
    $isSelected?: boolean;
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
    gap: 8px;  /* Selectbox들 사이 간격 */
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
    cursor: pointer; /* 클릭 가능하도록 설정 */
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
      <FooterNav />
    </div>
  );
}
