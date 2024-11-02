// UserContactInfo.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

const OrderInfoContainer = styled.div`
    padding: 16px;
    background-color: #FFFFFF;
`;

const RecentOrderWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 8px;
`;

const RecentOrderText = styled.div`
    background-color: #545454;
    border-radius: 50px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 6px;
`;

const ContactInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0 0 0;
`;

const OrderUserText = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const ContactUserPhone = styled.div`
    font-size: 12px;
`;

const ContactAdd = styled.div`
    font-size: 12px;
    color: #BCBCBC;
`;

interface UserInfoProps {
    orderUser: string;
    contactUser: string;
    phoneNum: string;
    contactAdd: string;
}

const UserContactInfo: React.FC<UserInfoProps> = ({ orderUser, contactUser, phoneNum, contactAdd }) => {
    return (
        <OrderInfoContainer>
            <RecentOrderWrapper><RecentOrderText>최근</RecentOrderText></RecentOrderWrapper>
            <ContactInfoContainer>
                <OrderUserText>{orderUser}</OrderUserText>
                <ContactUserPhone>{contactUser} | {phoneNum}</ContactUserPhone>
                <ContactAdd>{contactAdd}</ContactAdd>
            </ContactInfoContainer>
        </OrderInfoContainer>
    );
}

export default UserContactInfo;