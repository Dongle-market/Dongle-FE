// category/dog/[categoryId] page.tsx
'use client'

import Header from "@/components/layout/CategoryDetailHeader";
import FooterNav from "@/components/layout/CategoryFooterNav";
import styled from "styled-components";
import { useState } from "react";

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


export default function Home() {
    const [selectedItem, setSelectedItem] = useState("전체");

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
      <FooterNav />
    </div>
  );
}