// MyDongleFooterNav.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import HamburgerSvg from '../../../public/svgs/hamburger_icon.svg';
import MyDongleSvg from '../../../public/svgs/mydongle_icon_select.svg';
import DogHomeSvg from '../../../public/svgs/home_icon.svg';
import BasketSvg from '../../../public/svgs/basket_icon.svg';
import MySvg from '../../../public/svgs/user_icon.svg';

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

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
    align-items: center;
`;

const BoldText = styled.span`
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
    font-weight: bold;
`;

const MyDongleFooterNav = () => {
  return (
    <FooterNavContainer>
      <NavContainer>
        <IconContainer>
            <HamburgerSvg />
            <span>카테고리</span>
        </IconContainer>
        <IconContainer>
            <MyDongleSvg />
            <BoldText>마이 동글</BoldText>
        </IconContainer>
        <IconContainer>
            <DogHomeSvg />
            <span>동글 홈</span>
        </IconContainer>
        <IconContainer>
            <BasketSvg />
            <span>마이 마켓</span>
        </IconContainer>
        <IconContainer>
            <MySvg />
            <span>내 정보</span>
        </IconContainer>
      </NavContainer>
    </FooterNavContainer>
  );
};

export default MyDongleFooterNav;