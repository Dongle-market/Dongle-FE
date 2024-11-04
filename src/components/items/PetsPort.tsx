// PetsPort.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const PassportContainer = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
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
  background-color: #DCDCDC;
  border: 1.5px solid #C2C2C2;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const PassportBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 38px;
  padding: 16px;
`;

const PassPortHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
  font-size: 8px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

const PassportInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 12px;
    gap: 32px;
    align-items: center;
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
    width: 100%;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 48%;
`;

const InputTitle = styled.span`
    font-size: 8px;
    font-weight: 600;
    color: #FFFFFF;
`;

const InputContent = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #FF9E7E;
    text-decoration: none;
`;

const PassportImage = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 10px;
  object-fit: cover;
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

const Pet = {
    imageUrl: '/images/petprofileimages/dog1.png',
    name: '동글이',
    age: 7,
    gender: '여'
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
                        <PassportHeaderRight>동글월드 REPUBLIC OF DONGLE</PassportHeaderRight>
                    </PassPortHeaderContainer>
                    <PassportInfoContainer>
                        <PassportImage src={Pet.imageUrl} />
                        <InputBody>
                            <InputContainer>
                                <InputWrapper>
                                    <InputTitle>이름</InputTitle>
                                    <InputContent>{Pet.name}</InputContent>
                                </InputWrapper>
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
                                    <InputTitle></InputTitle>
                                    <InputContent></InputContent>
                                </InputWrapper>
                                <InputWrapper>
                                    <InputTitle>나이</InputTitle>
                                    <InputContent>{Pet.age}세</InputContent>
                                </InputWrapper>
                                <InputWrapper>
                                    <InputTitle>성별</InputTitle>
                                    <InputContent>{Pet.gender}</InputContent>
                                </InputWrapper>
                            </InputContainer>
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