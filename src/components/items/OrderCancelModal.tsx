// OrderCancelModal.tsx
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCancelButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  border: solid 1px #D9D9D9;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  color: #9D9D9D;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background-color: #E55737;
  color: white;
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #9D9D9D;
`;

interface OrderCancelModalProps {
    onClose: () => void;
    onOrderCancel: () => void;
}

function OrderCancelModal({ onClose, onOrderCancel }: OrderCancelModalProps) {
    const handleOrderCancel = () => {
        console.log('Order cancel...');
        onOrderCancel();
    };

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalText>정말 주문취소 하시겠어요..? 😿</ModalText>
                <OrderCancelButton onClick={handleOrderCancel}>주문취소</OrderCancelButton>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalContainer>
        </ModalBackdrop>
    );
}

export default OrderCancelModal;