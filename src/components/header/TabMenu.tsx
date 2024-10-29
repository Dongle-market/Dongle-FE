import React, { useState } from 'react';
import styled from 'styled-components';

const TabBarContainer = styled.div`
  display: flex;
  height: 48px;
  white-space: nowrap;
  scrollbar-width: none;     
  background: transparent;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  color: ${props => props.$isActive ? 'black' : '#808080'};
  border: none;
  background: transparent;
  border-bottom: ${props => props.$isActive ? '1px solid black' : '1px solid #D9D9D9'};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('wishlist');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabBarContainer>
        <Tab $isActive={activeTab === 'wishlist'} onClick={() => handleTabClick('wishlist')}>
          위시리스트
        </Tab>
        <Tab $isActive={activeTab === 'cart'} onClick={() => handleTabClick('cart')}>
          장바구니
        </Tab>
        <Tab $isActive={activeTab === 'orders'} onClick={() => handleTabClick('orders')}>
          주문내역
        </Tab>
      </TabBarContainer>
    </>
  );
};

export default TabMenu;