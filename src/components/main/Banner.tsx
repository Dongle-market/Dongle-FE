// Banner.tsx

import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// interface CustomSlideProps {
//   image: string;
// }

const CustomSlide = styled.div<{ $image: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  height: 240px;
  width: 100%;
  border-radius: 8px;
  background-image: url(${props => props.$image});
`;

const BannerContainer = styled.div`
  padding: 0 16px 32px 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 112px;
`;

const SliderWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const CustomDotContainer = styled.div`
  position: absolute;
  bottom: 4px;
  width: 100%;
  text-align: center;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: grey;
  border: none;
  cursor: pointer;

  &.slick-active {
    background: black;
  }
`;

const DotsList = styled.ul`
  padding-inline-start: 0px;
  margin: 0;
`;

const Banner: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: (dots: React.ReactNode[]) => (
          <CustomDotContainer>
            <DotsList>{dots}</DotsList>
          </CustomDotContainer>
        ),
        customPaging: (i: number) => (
          <Dot key={i} />
        ),
        nextArrow: <></>,
        prevArrow: <></>
    };

    const images = [
        '/images/banner1.png',
        '/images/banner2.png',
        '/images/banner3.png'
    ];

    return (
      <BannerContainer>
        <SliderWrapper>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <CustomSlide key={index} $image={image} />
                ))}
            </Slider>
        </SliderWrapper>
      </BannerContainer>
    );
}

export default Banner;