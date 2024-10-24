// MenuBar.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const MenuBarContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 12px 0 16px 16px;
  overflow-x: scroll;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const MenuItem = styled.div<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? 'rgba(229, 77, 41, 0.5)' : 'transparent')};
  border: solid 1.5px ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 20px;
  padding: 8px 16px;
  font-family: 'Pretendard';
  color: white;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: rgba(229, 77, 41, 0.5);
    color: white;
    border: solid 1.5px rgba(255, 255, 255, 0.7);
  }
`;

const MenuBar = () => {
  const [selectedItem, setSelectedItem] = useState('추천');

  const menuItems = [
    '추천',
    '베스트',
    '습식사료',
    '소프트사료',
    '건식사료',
    '수제간식',
    '빵/케이크',
    '뼈간식',
    '껌',
    '위생용품',
    '목욕용품',
    '훈련용품',
  ];

  return (
    <MenuBarContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item}
          $isSelected={selectedItem === item}
          onClick={() => setSelectedItem(item)}
        >
          {item}
        </MenuItem>
      ))}
    </MenuBarContainer>
  );
};

export default MenuBar;