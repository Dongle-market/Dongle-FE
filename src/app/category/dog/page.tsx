// category/dog/page.tsx

'use client';

import Header from "@/components/header/CategoryDetailHeader";
import FooterNav from "@/components/navbar/CategoryFooterNav";
import ArrowSvg from "../../../../public/svgs/down_arrow.svg";
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
    gap: 16px;  /* Selectbox들 사이 간격 */
`;

const SelectBoxContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    border: 1px solid gray;
    border-radius: 24px;
    position: relative;
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
  const [selectedItem1, setSelectedItem1] = useState("전체"); // 첫 번째 select 값
  const [selectedItem2, setSelectedItem2] = useState("추천순"); // 두 번째 select 값
  const [selectWidth1, setSelectWidth1] = useState(50); // 첫 번째 select 너비
  const [selectWidth2, setSelectWidth2] = useState(50); // 두 번째 select 너비
  const firstSelectRef = useRef<HTMLSelectElement>(null);
  const secondSelectRef = useRef<HTMLSelectElement>(null);

  // 선택된 텍스트에 맞춰 Selectbox의 너비 설정하는 함수
  const adjustSelectWidth = (selectRef: React.RefObject<HTMLSelectElement>, setWidth: React.Dispatch<React.SetStateAction<number>>) => {
      if (selectRef.current) {
          const selectedOption = selectRef.current.options[selectRef.current.selectedIndex];
          const tempSpan = document.createElement("span");
          tempSpan.style.fontSize = "12px";  // Select와 동일한 폰트 크기 적용
          tempSpan.style.visibility = "hidden";
          tempSpan.style.position = "absolute";
          tempSpan.innerText = selectedOption.text;
          document.body.appendChild(tempSpan);
          
          const newWidth = tempSpan.offsetWidth + 12; // 텍스트 길이에 패딩 포함
          setWidth(newWidth);
          document.body.removeChild(tempSpan);
      }
  };

  useEffect(() => {
      adjustSelectWidth(firstSelectRef, setSelectWidth1);  // 처음 로드 시 첫 번째 select 너비 조정
      adjustSelectWidth(secondSelectRef, setSelectWidth2); // 처음 로드 시 두 번째 select 너비 조정
  }, []);

  const handleFirstSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedItem1(e.target.value);
      adjustSelectWidth(firstSelectRef, setSelectWidth1);
  };

  const handleSecondSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedItem2(e.target.value);
      adjustSelectWidth(secondSelectRef, setSelectWidth2);
  };

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
            $isSelected={selectedItem1 === item}
            onClick={() => setSelectedItem1(item)}
          >
            {item}
            </Item>
         ))}
       </Content>
      <FilterContainer>
      <SelectBoxContainer>
      <Select 
                value={selectedItem1} 
                onChange={handleFirstSelectChange} 
                ref={firstSelectRef}
                style={{ width: `${selectWidth1}px` }} // 첫 번째 select 너비 적용
            >
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
        <Select 
                value={selectedItem2} 
                onChange={handleSecondSelectChange} 
                ref={secondSelectRef}
                style={{ width: `${selectWidth2}px` }} // 두 번째 select 너비 적용
            >
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
