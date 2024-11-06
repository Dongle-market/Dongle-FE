// NoTossPayButton.tsx

import React from 'react';
import styled from 'styled-components';
import TossPayLogoSvg from '../../../public/svgs/element/toss_pay_logo.svg';

const TossPayButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    max-width: 568px;
    width: calc(100% - 32px);
    margin: 16px;
    padding: 24px;
    background-color: #D9D9D9;
    border-radius: 12px;
    gap: 4px;
    cursor: pointer;
`;

const TossPayButtonText = styled.span`
    font-family: 'Pretendard';
    font-size: 16px;
    color: white;
`;

const NoTossPayButton = () => {
    return (
        <TossPayButtonContainer>
            <TossPayLogoSvg />
            <TossPayButtonText>로 5초만에 결제</TossPayButtonText>
        </TossPayButtonContainer>
    );
}

export default NoTossPayButton;