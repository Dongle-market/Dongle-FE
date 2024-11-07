// UserInfoFooterNav.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import HamburgerSvg from '/public/svgs/navbar/hamburger_icon.svg';
import MyDongleSvg from '/public/svgs/navbar/mydongle_icon.svg';
import DogHomeSvg from '/public/svgs/navbar/home_icon.svg';
import BasketSvg from '/public/svgs/navbar/basket_icon.svg';
import MySvg from '/public/svgs/navbar/user_icon_select.svg';
import Link from 'next/link';
import { useUserStore } from '@/store/user';

const FooterNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: inherit;
  height: 70px;
  background-color: rgba(253, 253, 253, 0.66);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const IconContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
    align-items: center;
    text-decoration: none;
`;

const BoldText = styled.span`
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
    font-weight: 600;
`;

const UserInfoFooterNav = () => {
  const petId = useUserStore((state) => state.petId);
  return (
    <FooterNavContainer>
      <NavContainer>
        <IconContainer href="/category">
            <HamburgerSvg />
            <span>카테고리</span>
        </IconContainer>
        <IconContainer href={petId ? `/mydongle/${petId}` : '/mydongle/add'}>
            <MyDongleSvg />
            <span>마이 동글</span>
        </IconContainer>
        <IconContainer href="/home">
            <DogHomeSvg />
            <span>동글 홈</span>
        </IconContainer>
        <IconContainer href="/mymarket/history">
            <BasketSvg />
            <span>마이 마켓</span>
        </IconContainer>
        <IconContainer href="/profile">
            <MySvg />
            <BoldText>내 정보</BoldText>
        </IconContainer>
      </NavContainer>
    </FooterNavContainer>
  );
};

export default UserInfoFooterNav;