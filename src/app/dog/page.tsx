// /dog/pages.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from "@/components/layout/MainHeader";
import FooterNav from "@/components/layout/FooterNav";
import MenuBar from "@/components/MenuBar";
import Banner from "@/components/Banner";
import MainItem from "@/components/MainItem";
import Toggle from '@/components/Toggle';

const DogMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  padding-bottom: 70px; 
  box-sizing: border-box;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  align-items: center;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
`;

const BoldText = styled.span`
    font-family: 'Pretendard';
    font-size: 16px;
    color: black;
    text-align: center;
    font-weight: 600;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 32px 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 16px;
  gap: 12px;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 600px;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;


// const MainHeaderContainer = styled.div`
//   position: fixed;
//   width: 100%;
//   max-width: 600px;
//   height: 121px;
//   top: 0;
//   z-index: 1000;
//   box-sizing: border-box;
//   background-image: url('/images/background_main.png');
//   background-size: 100% auto; // 이미지가 컨테이너를 완전히 채우도록 설정
//   background-position: center; // 이미지가 중앙에 위치하도록 설정
//   background-repeat: no-repeat; // 이미지 반복 없이 설정
// `;

interface MainHeaderContainerProps {
  $bgColor: string; 
}

const MainHeaderContainer = styled.div<MainHeaderContainerProps>`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 121px;
  top: 0;
  box-sizing: border-box;
  background-color: ${(props) => props.$bgColor};
  transition: background-color 0.3s ease;
`;


export default function Home() {

  const [bgColor, setBgColor] = useState("transparent");

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setBgColor("transparent");
    } else {
      setBgColor("#222222");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const products = [
    { id: 1, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" },
    { id: 2, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" },
    { id: 3, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" },
    { id: 4, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" },
    { id: 5, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" },
    { id: 6, name: "도치빌 리더스", price: 34000, imageUrl: "/images/product1.png" }
  ];

  return (
    <div className="page">
      <div className="mainpage">
        <MainHeaderContainer $bgColor={bgColor}>
          <MainHeader />
          <ButtonWrapper>
            <Toggle />
            <MenuBar />
          </ButtonWrapper>
        </MainHeaderContainer>
        <DogMainPage>
          <Banner />
          <ProductWrapper>
            <Title>날도 선선해졌으니 <BoldText>산책하러 갈까?</BoldText> 🍂</Title>
            <ProductContainer>
              {products.map(product => (
                <MainItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </ProductContainer>
          </ProductWrapper>
          <ProductWrapper>
            <Title>가을은 살 찌는 계절 <BoldText>다이어트 해볼까!</BoldText> 💪</Title>
            <ProductContainer>
              {products.map(product => (
                <MainItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </ProductContainer>
          </ProductWrapper>
          <ProductWrapper>
            <Title>우리 <BoldText>댕댕이</BoldText>를 위하여〰️🐶</Title>
            <ProductContainer>
              {products.map(product => (
                <MainItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </ProductContainer>
          </ProductWrapper>
        </DogMainPage>
        <FooterNav />
      </div>
    </div>
  );
}