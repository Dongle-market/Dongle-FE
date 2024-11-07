// HistoryItem.tsx

import React, { useState } from "react";
import styled from "styled-components";
import SelectPets from "./SelectPets";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useItemRouting } from "@/utils/itemIdRouting";
import OrderCancelModal from "./OrderCancelModal";
import { removeHtmlTags } from "@/utils/removeHtmlTags";
import { cancelOrderItem } from "../../../src/services/order/order";
import { addCartItem } from "@/services/carts/carts";
import { useUserStore } from "@/store/user";
import { PetDigestType } from "@/services/pets/pets.type";

const HistoryItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;

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
  color: #d9d9d9;
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
  color: #d9d9d9;
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
  background-color: #f1f1f1;
  font-family: "Pretendard";
  font-size: 12px;
  color: #5e5e5e;
  text-decoration: none;
  border-radius: 30px;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

interface HistoryItemProps {
  itemId: number;
  orderId: number;
  orderItemId: number;
  imageurl: string;
  name: string;
  price: number;
  orderDate: string;
  petList: PetDigestType[];
  selectedPetIds: number[];
  amount: number;
  onDeleteSuccess: (itemId: number) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  itemId,
  orderItemId,
  imageurl,
  name,
  price,
  petList,
  selectedPetIds,
  amount,
  onDeleteSuccess,
}) => {
  const routeToItem = useItemRouting();
  const [showModal, setShowModal] = useState(false);
  const setCartCount = useUserStore((state) => state.setCartCount);

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
      toast("주문 취소가 완료되었습니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => window.location.reload(), // 토스트 메시지가 닫힐 때 페이지 새로 고침
      });
      onDeleteSuccess(orderItemId);
      handleClose();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast("해당 주문상품이 존재하지 않습니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleClose();
    }
  };

  const handleAddToCart = async (itemId: number) => {
    try {
      const data = await addCartItem(itemId, amount);
      setCartCount(data.cartCount);
      toast(
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          장바구니에 상품을 담았습니다.
          <Link href="/mymarket/cart" style={{ color: "white" }}>
            바로가기
          </Link>
        </div>
      );
    } catch {
      toast(
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          이미 담긴 상품입니다. 장바구니로 이동하시겠어요?
          <Link href="/mymarket/cart" style={{ color: "white" }}>
            바로가기
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        style={{
          marginBottom: "135px",
          padding: 0,
          width: "100%",
        }}
      />
      <HistoryItemContainer>
        <Image src={imageurl} alt={name} onClick={() => routeToItem(itemId)} />
        <InfoContainer>
          <Info>
            <Name onClick={() => routeToItem(itemId)}>
              {removeHtmlTags(name)}
            </Name>
            <OrderCancel onClick={handleOrderCancelClick}>주문취소</OrderCancel>
            {showModal && (
              <OrderCancelModal
                onClose={handleClose}
                onOrderCancel={() => handleOrderCancel(orderItemId)}
                orderItemId={orderItemId}
              />
            )}
          </Info>
          <Info2>
            <Price onClick={() => routeToItem(itemId)}>
              {price.toLocaleString()} 원
            </Price>
            <BarText>|</BarText>
            <AmountWrapper>
              <Amount>{amount}개</Amount>
            </AmountWrapper>
          </Info2>
          <Info>
            <SelectPets orderItemId={orderItemId} petList={petList} selectedPetIds={selectedPetIds} isInteractive={false} />
            <CartButton onClick={() => handleAddToCart(itemId)}>
              장바구니 담기
            </CartButton>
          </Info>
        </InfoContainer>
      </HistoryItemContainer>
      {/* Custom CSS for toast style */}
      <style jsx global>{`
        .Toastify__toast-container {
          max-width: 600px;
          width: 100%;
        }
        .Toastify__toast {
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.5) !important;
          color: #fff !important;
          backdrop-filter: blur(5px);
          border-radius: 16px;
          margin: 16px;
        }
      `}</style>
    </>
  );
};

export default HistoryItem;
