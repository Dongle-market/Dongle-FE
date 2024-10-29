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

const PetHeader = styled.div`
  padding-top: 96px;
  padding-bottom: 24px;
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

const CatImg01 = styled(Image)`
  margin-left: 16px;
  width: 64px;
  height: 64px;
  border-radius: 100%;
`;

const Petsport = styled.div`
  position: absolute;
  width: 358px;
  height: 240px;
  background-color: #dcdcdc;
  border: 1.5px solid #c2c2c2;
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
    <>
      <Header />
      <PetHeader>
        <DogImg01 src={DogImg} alt="강아지 이미지" />
        <CatImg01 src={CatImg} alt="고양이 이미지" />
        <Addpet />
      </PetHeader>
      <Petsport />
      <MyDongleFooterNav />
    </>
  );
}
