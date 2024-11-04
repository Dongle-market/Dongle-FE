// MenuBar.tsx

import React from 'react';
import styled from 'styled-components';

const MenuBarContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const MenuItem = styled.div<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? 'rgba(229, 77, 41, 0.5)' : 'rgba(255, 214, 205, 0.3)')};
  border: solid 1.5px ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 20px;
  padding: 6px 14px;
  font-family: 'Pretendard';
  font-size: 14px;
  white-space: nowrap;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(229, 77, 41, 0.5);
    border: solid 1.5px rgba(255, 255, 255, 0.7);
    color: white;
  }
`;

interface MenuBarProps {
  $selectedItem: string | null;
  onItemClick: (item: string) => void;
}


const MenuBar: React.FC<MenuBarProps> = ({ $selectedItem, onItemClick }) => {
  const menuItems = ['사료', '간식', '용품'];

  return (
    <MenuBarContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item}
          $isSelected={$selectedItem === item}
          onClick={() => onItemClick(item)}
        >
          {item}
        </MenuItem>
      ))}
    </MenuBarContainer>
  );
};

export default MenuBar;
