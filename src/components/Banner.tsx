'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 300px;
  overflow: hidden;
  position: relative;
`;

const Banners = styled.div<{ $currentSlide: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 100}%)`};
  width: 300%;
`;

const BannerItem = styled.div`
  flex: 0 0 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
`;

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    '../../public/images/banner1.png',
    '../../public/images/banner2.png',
    '../../public/images/banner3.png',
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000); // 5초마다 슬라이드 전환

    return () => clearInterval(slideInterval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [banners.length]);

  return (
    <BannerContainer>
      <Banners $currentSlide={currentSlide}>
        {banners.map((banner, index) => (
          <BannerItem
            key={index}
            style={{ backgroundImage: `url(${banner})` }}
          />
        ))}
      </Banners>
    </BannerContainer>
  );
};

export default Banner;