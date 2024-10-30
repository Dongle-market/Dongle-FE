import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    switch (router.pathname) {
      case '/mymarket/wishlist':
        setActiveTab('wishlist');
        break;
      case '/mymarket/cart':
        setActiveTab('cart');
        break;
      case '/mymarket/history':
        setActiveTab('history');
        break;
      default:
        setActiveTab('wishlist');
    }
  }, [router.pathname]);

  const handleTabClick = (tab: string, url: string) => {
    setActiveTab(tab);
    router.push(url);
  };

  return (
    <>
      <TabBarContainer>
        <Tab $isActive={activeTab === 'wishlist'} onClick={() => handleTabClick('wishlist', '/mymarket/wishlist')}>
          위시리스트
        </Tab>
        <Tab $isActive={activeTab === 'cart'} onClick={() => handleTabClick('cart', '/mymarket/cart')}>
          장바구니
        </Tab>
        <Tab $isActive={activeTab === 'history'} onClick={() => handleTabClick('history', '/mymarket/history')}>
          주문내역
        </Tab>
      </TabBarContainer>
    </>
  );
};

export default TabMenu;