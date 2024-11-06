// OrderCompleteItem.tsx

import React from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { useItemRouting } from '@/utils/itemIdRouting';
import { removeHtmlTags } from '@/utils/removeHtmlTags';

const HistoryItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #D9D9D9;

  &:last-child {
    border-bottom: none;
  }
`;

const Image = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 16px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  max-width: 468px;
  width: 100%;
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
`;

const Name = styled.div`
    font-size: 16px;
    overflow: hidden;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
    cursor: pointer;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const BarText = styled.div`
    font-size: 16px;
    color: #D9D9D9;
`;

const AmountWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Amount = styled.div`
    font-size: 14px;
    color: #919191;
`;

interface OrderCompleteItemProps {
    itemId: number;
    imageUrl: string;
    name: string;
    price: number;
    amount: number;
}

const OrderCompleteItem: React.FC<OrderCompleteItemProps> = ({ itemId, imageUrl, name, price, amount }) => {
    const routeToItem = useItemRouting();

    return (
        <HistoryItemContainer>
            <Image src={imageUrl} alt={name} onClick={() => routeToItem(itemId)} />
            <InfoContainer>
                    <Name onClick={() => routeToItem(itemId)}>{removeHtmlTags(name)}</Name>
                <Info>
                    <Price onClick={() => routeToItem(itemId)}>{price.toLocaleString()} 원</Price>
                    <BarText>|</BarText>
                    <AmountWrapper>
                        <Amount>{amount}개</Amount>
                    </AmountWrapper>
                </Info>
            </InfoContainer>
        </HistoryItemContainer>
    );
};

export default OrderCompleteItem;