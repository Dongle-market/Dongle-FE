// /myDongle/myDongleHeader.tsx
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

const MyDongleHeader = () => {
  return (
    <>
      <PetHeader>
        <DogImg01 src={DogImg} alt="강아지 이미지" />
        <CatImg01 src={CatImg} alt="고양이 이미지" />
        <Addpet />
      </PetHeader>
    </>
  );
};

export default MyDongleHeader;
