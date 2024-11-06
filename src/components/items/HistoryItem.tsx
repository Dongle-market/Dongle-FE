// HistoryItem.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import SelectPets from './SelectPets';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useItemRouting } from '@/utils/itemIdRouting';
import OrderCancelModal from './OrderCancelModal';
import { removeHtmlTags } from '@/utils/removeHtmlTags';
import { cancelOrderItem } from '../../../src/services/order/order';

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
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
`;
const Info2 = styled.div`
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

const OrderCancel = styled.div`
  font-size: 12px;
  color: #D9D9D9;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 60px;
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

const CartButton = styled.button`
  background-color: #F1F1F1;
  font-family: "Pretendard";
  font-size: 12px;
  color: #5E5E5E;
  text-decoration: none;
  border-radius: 30px;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

interface HistoryItemProps {
    itemId: number;
    orderItemId: number;
    imageUrl: string;
    name: string;
    price: number;
    orderDate: string;
    selectedPetIds: number[];
    amount: number;
    cartItems: { name: string; price: number; }[];
    onDeleteSuccess: (itemId: number) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ itemId, orderItemId, imageUrl, name, price, cartItems, selectedPetIds, amount, onDeleteSuccess }) => {
    const routeToItem = useItemRouting();
    const [showModal, setShowModal] = useState(false);

    const handleOrderCancelClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    // 주문 취소 API 호출
    const handleOrderCancel = async (orderItemId: number) => {
        try {
            await cancelOrderItem(orderItemId);
            toast('주문 취소가 완료되었습니다.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => window.location.reload(),  // 토스트 메시지가 닫힐 때 페이지 새로 고침
                style: {
                    marginTop: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    color: 'white',
                    textAlign: 'center'
                }
            });
            onDeleteSuccess(orderItemId);
            handleClose();
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast('해당 주문상품이 존재하지 않습니다.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    marginTop: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    color: 'white',
                    textAlign: 'center'
                }
            });
            handleClose();
        }
    };

    const isItemInCart = () => {
        return cartItems.some(item => item.name === name && item.price === price);
    };

    const ToastContent = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                color: 'white',
                fontSize: '12px'
            }}>
                <span>장바구니에 상품을 담았습니다.</span>
                <Link href="/mymarket/cart" style={{ color: 'white' }}>바로가기</Link>
            </div>
        );
    };

    const ToastContentAlreadyInCart = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                color: 'white',
                fontSize: '12px'
            }}>
                <span>이미 장바구니에 있는 상품입니다.</span>
                <Link href="/mymarket/cart" style={{ color: 'white' }}>바로가기</Link>
            </div>
        );
    };

    const handleAddToCart = () => {
        if (isItemInCart()) {
            toast(<ToastContentAlreadyInCart />, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    marginBottom: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                }
            });
        } else {
            toast(<ToastContent />, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    marginBottom: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                }
            });
        }
    };

    return (
        <HistoryItemContainer>
            <Image src={imageUrl} alt={name} onClick={() => routeToItem(itemId)} />
            <InfoContainer>
                <Info>
                    <Name onClick={() => routeToItem(itemId)}>{removeHtmlTags(name)}</Name>
                    <OrderCancel onClick={handleOrderCancelClick}>주문취소</OrderCancel>
                    {showModal && <OrderCancelModal onClose={handleClose} onOrderCancel={() => handleOrderCancel(orderItemId)} orderItemId={orderItemId} />}
                </Info>
                <Info2>
                    <Price onClick={() => routeToItem(itemId)}>{price.toLocaleString()} 원</Price>
                    <BarText>|</BarText>
                    <AmountWrapper>
                        <Amount>{amount}개</Amount>
                    </AmountWrapper>
                </Info2>
                <Info>
                    <SelectPets selectedPetIds={selectedPetIds} isInteractive={false} />
                    <CartButton onClick={handleAddToCart}>장바구니 담기</CartButton>
                </Info>
            </InfoContainer>
        </HistoryItemContainer>
    );
};

export default HistoryItem;