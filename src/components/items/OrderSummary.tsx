// OrderSummary.tsx
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  position: fixed;
  bottom: 70px;
  width: 100%;
  max-width: inherit;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FFFFFF;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

const OrderInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const OrderInfo = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
`;

const TotalCount = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-left: 4px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const OrderButton = styled.div`
  background-color: #ED6648;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 20px;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

interface OrderSummaryProps {
    itemCount: number;
    totalPrice: number;
    onClick?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ itemCount, totalPrice, onClick }) => {
    return (
        <SummaryContainer>
            <OrderInfoContainer>
                <OrderInfo>총 <TotalCount>{itemCount}</TotalCount> 개 항목</OrderInfo>
                <Price>{totalPrice.toLocaleString()} 원</Price>
            </OrderInfoContainer>
            <OrderButton onClick={onClick}>주문하기</OrderButton>
        </SummaryContainer>
    );
}

export default OrderSummary;