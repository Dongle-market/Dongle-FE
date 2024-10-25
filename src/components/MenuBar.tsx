// MenuBar.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

const MenuBarContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 60px;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const MenuItem = styled.div`
  background-color: transparent;
  border: solid 1.5px rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  font-family: 'Pretendard';
  font-size: 14px;
  white-space: nowrap;
  color: white;

  &:hover {
    background-color: rgba(229, 77, 41, 0.5);
    border: solid 1.5px rgba(255, 255, 255, 0.7);
    color: white;
  }
`;

const MenuBar = () => {
  return (
    <MenuBarContainer>
      <MenuItem>사료</MenuItem>
      <MenuItem>간식</MenuItem>
      <MenuItem>용품</MenuItem>
    </MenuBarContainer>
  );
}

export default MenuBar;