// /profile/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserHeader from '@/components/header/CategoryHeader';
import UserInfoFooterNav from '@/components/navbar/UserInfoFooterNav';
import CartItem from '@/components/items/CartItem';
import PassPort from '@/components/items/PassPort';
import LogoutModal from '@/components/items/LogoutModal';

interface CartItem {
    id: number;
    imageUrl: string;
    brand: string
    name: string;
    price: number;
    selected: boolean;
};

const initialItems: CartItem[] = [
    { id: 1, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: true },
    { id: 2, imageUrl: '/images/Baek.png', brand: '아디다스', name: '어얼얽--', price: 34000, selected: true },
    { id: 3, imageUrl: '/images/An.png', brand: '아디다스', name: '고기가 이븐하게 익지 않아써여', price: 34000, selected: true },
    { id: 4, imageUrl: '/images/An.png', brand: '아디다스', name: '보류입니다.', price: 34000, selected: true },
    { id: 5, imageUrl: '/images/An.png', brand: '아디다스', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000, selected: true },
    { id: 6, imageUrl: '/images/Baek.png', brand: '아디다스', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000, selected: true },
    { id: 7, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 8, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 9, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 10, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000, selected: false },
    { id: 11, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: false }
];

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 32px;
`;

const MyProfileTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    /* color: #352412; */
    color: #0B0D83;
    text-align: center;
`;

const LogOutButton = styled.div`
  width: 100%;
  height: 40px;
  background-color: transparent;
  color: #9D9D9D;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-top: 16px;
  text-decoration: underline;
`;

export default function ProfilePage() {
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const [showModal, setShowModal] = useState(false);
  
    const handleLogoutClick = () => {
      setShowModal(true);
    };
  
    const handleClose = () => {
      setShowModal(false);
    };
  
    const handleLogout = () => {
      console.log("로그아웃 처리");
      setShowModal(false);
      window.location.href = '/';
    };

    return (
        <div className="page">
            <UserHeader itemCount={items.length} />
            <div className='content'>
                <Wrapper>
                    <MyProfileTitle>IDENTIFICATION CARD</MyProfileTitle>
                    <PassPort />
                </Wrapper>
                <LogOutButton onClick={handleLogoutClick}>로그아웃</LogOutButton>
                {showModal && <LogoutModal onClose={handleClose} onLogout={handleLogout} />}
            </div>
            <UserInfoFooterNav />
        </div>
    );
}