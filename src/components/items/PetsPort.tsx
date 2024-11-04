// PetsPort.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import BadgeSvg from '/public/svgs/element/badge.svg';
import Link from 'next/link';

const PassportContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  padding: 0 16px;
`;

const Passport = styled.div`
  position: absolute;
  bottom: 0;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstPassport = styled(Passport)`
  background-color: #35241E;
  width: 98%;
  height: 98%;
  z-index: 2;
`;

const SecondPassport = styled(Passport)`
  background-color: DCDCDC;
  border: 1.5px solid #C2C2C2;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const PassportBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  padding: 16px;
`;

const PassPortHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PassportHeaderLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
`;

const PassportHeaderLeft = styled.div`
  font-size: 10px;
  color: #FF9E7E;
`;

const BoldText = styled.div`
    font-size: 10px;
    color: #FF9E7E;
    font-weight: 600;
`;

const PassportHeaderRight = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #0B0D83;
`;

const PassportInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 12px;
`;

const InputBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const InputTitle = styled.span`
    font-size: 8px;
    font-weight: 600;
    color: #0B0D83;
`;

const InputContent = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    text-decoration: none;
`;

const ClubBadge = styled.div`
    display: flex;
    align-items: center;
    background-color: #0B0D83;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    margin: 10px 0 0 0;
    color: white;
`;

const PassportImage = styled.img`
  width: 128px;
  height: 160px;
  margin-right: 24px;
  object-fit: cover;
`;

const UserEditButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(11, 13, 131, 0.75);
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
`;

const PetsPortCode = styled.img`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 12px;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;

const User = {
    name: '최우진',
    imageUrl: '/images/babodaejang.png',
    email: 'ureca@kakao.com',
    phone: '010-1234-5678'
};

const PetsPort = () => {
    return (
        <PassportContainer>
            <FirstPassport>
                <PassportBody>
                    <PassPortHeaderContainer>
                        <PassportHeaderLeftWrapper>
                            <PassportHeaderLeft>여권</PassportHeaderLeft>
                            <BoldText>PETSPORT</BoldText>
                        </PassportHeaderLeftWrapper>
                        <PassportHeaderRight>동글민국 REPUBLIC OF DONGLE</PassportHeaderRight>
                    </PassPortHeaderContainer>
                    <PassportInfoContainer>
                        <PassportImage src={User.imageUrl} />
                        <InputBody>
                            <InputContainer>
                                <InputWrapper>
                                    <InputTitle>국가코드</InputTitle>
                                    <InputContent>KOR</InputContent>
                                </InputWrapper>
                                <InputWrapper>
                                    <InputTitle>여권번호</InputTitle>
                                    <InputContent>URECA001</InputContent>
                                </InputWrapper>
                            </InputContainer>
                            <InputContainer>
                                <InputWrapper>
                                    <InputTitle>이름</InputTitle>
                                    <InputContent>{User.name}</InputContent>
                                </InputWrapper>
                                <ClubBadge><BadgeSvg /> 댕니버스 클럽</ClubBadge>
                            </InputContainer>
                            <InputWrapper>
                                <InputTitle>전화번호</InputTitle>
                                <InputContent>010-1234-5678</InputContent>
                            </InputWrapper>
                            <UserEditButton href="/profile/edit">✈️ 회원정보 수정</UserEditButton>
                        </InputBody>
                    </PassportInfoContainer>
                </PassportBody>
                <PetsPortCode src='/svgs/pet/passportcode.svg' />
            </FirstPassport>
            <SecondPassport />
        </PassportContainer>
    )
};

export default PetsPort;