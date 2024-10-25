// FooterNav.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import WhiteDogSvg from '../../../public/svgs/whitedog.svg';
import HamburgerSvg from '../../../public/svgs/hamburger.svg';
import DogFootSvg from '../../../public/svgs/dogfoot.svg';
import BasketSvg from '../../../public/svgs/basket.svg';
import MySvg from '../../../public/svgs/my.svg';

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
    font-weight: 600;
`;

const FooterNav = () => {
  return (
    <FooterNavContainer>
      <NavContainer>
        <IconContainer>
            <HamburgerSvg />
            <span>카테고리</span>
        </IconContainer>
        <IconContainer>
            <WhiteDogSvg />
            <span>마이 동글</span>
        </IconContainer>
        <IconContainer>
            <DogFootSvg />
            <BoldText>동글 홈</BoldText>
        </IconContainer>
        <IconContainer>
            <BasketSvg />
            <span>장바구니</span>
        </IconContainer>
        <IconContainer>
            <MySvg />
            <span>마이</span>
        </IconContainer>
      </NavContainer>
    </FooterNavContainer>
  );
};

export default FooterNav;