// /myDongle/pages.tsx
"use client";

import React from "react";
import styled from "styled-components";
import MyDongleFooterNav from "@/components/navbar/MyDongleFooterNav";
import Header from "@/components/header/CategoryHeader";
import Image from "next/image";
import DogImg from "../../../public/images/dog01.png";
import CatImg from "../../../public/images/cat01.png";
import Addpet from "../../../public/svgs/pet/addpet.svg";
import CodeBlock from "/public/svgs/pet/codeBlock.svg";
import MyDongleHeader from "../../components/header/MyDongleHeader"

const PetHeader = styled.div`
  padding-top: 36px;
  height: 124px;
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
`;

const DogImg01 = styled(Image)`
  margin-left: 16px;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  border: 2px solid #e55737;
`;

const DogImg02 = styled(Image)`
  margin-left: 20px;
  width: 86px;
  height: 86px;
  border-radius: 10%;
`;

const CatImg01 = styled(Image)`
  margin-left: 16px;
  margin-right: 16px;
  width: 64px;
  height: 64px;
  border-radius: 100%;
`;

const CodeBlockImg = styled(Image)`
  width: 64px;
  height: 64px;
`;

const PetsportComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Petsport = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 22px 22px 0 0;
  margin: 0 16px;
  width: 100%;
  height: 238.5px;
  background-color: #dcdcdc;
  border: 1.5px solid #c2c2c2;
`;

const PetsportPage = styled.div`
  position: relative;
  border-radius: 15px 15px 0 0;
  width: 100%;
  margin: 8px 8px;
  height: 232px;
  background-color: #35241e;
`;
const TextLine = styled.div`
  display: flex;
  justify-content: space-between; /* 양쪽 끝에 요소 배치 */
`;

const PetsportText = styled.span`
  margin: 20px;
  font-size: 10px;
  color: #ff9e7e;
  font-family: "Pretendard";
  font-weight: 400;
  text-align: left;
`;

const BoldText = styled.span`
  font-weight: 700; /* "PETSPORT" 부분만 굵게 */
`;

const DongleText = styled.span`
  margin: 20px;
  font-size: 10px;
  color: #ffffff;
  font-family: "Pretendard";
  opacity: 0.6;
  font-weight: 400;
  text-align: right;
`;

const TitleText = styled.span`
  margin-bottom: 4px;
  margin-left: 20px;
  font-size: 8px;
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 500;
`;

const InfoText = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: #ff9e7e;
  font-family: "Pretendard";
  font-weight: 500;
`;

const TabTitle = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: #ff9e7e;
  font-family: "Pretendard";
  font-weight: 500;
`;

const TitleTextContianer = styled.div`
  display: flex;
`;

const Position = styled.div`
  display: flex;
`;

const LineComponent = styled.div`
  margin-top: 10px;
  background-color: #080808;
  width: 50%;
  height: 1.5px;
`;
const PetsPortContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  bottom: 24px;
  /* background-image: url(/svgs/pet/codeBlock.svg);
  background-repeat: no-repeat; */
  /* background-color: red; */
`;
const LineComponent2 = styled.div`
  margin-top: 10px;
  background-color: #d9d9d9;
  width: 50%;
  height: 1.5px;
`;

const Tab01 = styled.span`
  text-align: center;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 600;
  width: 50%;
  line-height: 48px;
  color: #080808;
`;

const Tab02 = styled.span`
  text-align: center;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 600;
  width: 50%;
  line-height: 48px;
  color: #5e5e5e;
`;

const TabComponent = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const NoneComponent = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  gap: 16px; /* 텍스트와 버튼 사이 여백 */
  text-align: center;
`;

const NoneText = styled.span`
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 400;
  color: #5e5e5e;
`;

const GoToWishListButton = styled.button`
  font-family: "Pretendard";
  padding: 10px 18px;
  font-size: 14px;
  background-color: #eeeeee;
  color: #888888;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #cccccc; /* 버튼 호버 색상 */
  }
`;

export default function myDongle() {
  const products = [
    {
      id: 1,
      name: "동글이",
      code: "KOR",
      number: "DOG001",
      age: 7,
      gender: "여",
    },
  ];

  return (
    <div className="page">
      <Header itemCount={5} />
      <div className="content">
        <MyDongleHeader />
        <PetsportComponent>
          <Petsport>
            <PetsportPage>
              <TextLine>
                <PetsportText>
                  여권 <BoldText>PETSPORT</BoldText>
                </PetsportText>
                <DongleText>동글월드 REPUBLIC OF DONGLE</DongleText>
              </TextLine>
              <Position>
                <DogImg02 src={DogImg} alt="강아지 이미지" />
                <TitleTextContianer>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleText>이름</TitleText>
                    <InfoText>동글이</InfoText>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleText>국가코드</TitleText>
                    <InfoText>KOR</InfoText>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleText>여권번호</TitleText>
                    <InfoText>DOG001</InfoText>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleText>나이</TitleText>
                    <InfoText>7세</InfoText>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleText>성별</TitleText>
                    <InfoText>여</InfoText>
                  </div>
                </TitleTextContianer>
              </Position>
              <PetsPortContainer>
                <img src="/svgs/pet/codeBlock.svg" alt="여권코드이미지" />
                {/* <Image  fill /> */}
              </PetsPortContainer>
            </PetsportPage>
          </Petsport>
        </PetsportComponent>
        <Position>
          <LineComponent />
          <LineComponent2 />
        </Position>
        <TabComponent>
          <Tab01>위시리스트</Tab01>
          <Tab02>주문내역</Tab02>
        </TabComponent>
        <NoneComponent>
          <NoneText>
            내 아이에게 주고싶은 물건을
            <br />
            위시리스트에서 고를 수 있어요!
          </NoneText>
          <GoToWishListButton>위시리스트 바로가기</GoToWishListButton>
        </NoneComponent>
      </div>
      <MyDongleFooterNav />
    </div>
  );
}
