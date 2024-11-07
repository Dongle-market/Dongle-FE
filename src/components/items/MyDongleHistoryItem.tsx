// MyDongleHistoryItem.tsx

import React from "react";
import styled from "styled-components";
// import Link from "next/link";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseSvg from "../../../public/svgs/element/close.svg";
import { ItemType } from "@/types/item";
import { useItemRouting } from "@/utils/itemIdRouting";
import { removeHtmlTags } from "@/utils/removeHtmlTags";
import { formatDeliveryDate } from "@/utils/formatDeliveryDate";

const MyDongleHistoryItemContainer = styled.div`
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

const OrderDate = styled.div`
  font-size: 12px;
  color: #545454;
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

interface MyDongleHistoryItemProps {
  itemId: ItemType['itemId'];
  imageurl: string;
  name: string;
  price: number;
  orderDate: string;
  // cartItems: { name: string; price: number; }[];
  // selectedPetIds: number[];
  removeItem: () => void;
}

const MyDongleHistoryItem: React.FC<MyDongleHistoryItemProps> = ({ itemId, imageurl, name, price, orderDate, removeItem }) => {

  const routeToItem = useItemRouting();

  // const isItemInCart = () => {
  //   return cartItems.some(item => item.name === name && item.price === price);
  // };

  // const ToastContent = () => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         width: "100%",
  //         color: "white",
  //         fontSize: "12px",
  //       }}
  //     >
  //       <span>장바구니에 상품을 담았습니다.</span>
  //       <Link href="/mymarket/cart" style={{ color: "white" }}>
  //         바로가기
  //       </Link>
  //     </div>
  //   );
  // };

  // const ToastContentAlreadyInCart = () => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         width: "100%",
  //         color: "white",
  //         fontSize: "12px",
  //       }}
  //     >
  //       <span>이미 장바구니에 있는 상품입니다.</span>
  //       <Link href="/mymarket/cart" style={{ color: "white" }}>
  //         바로가기
  //       </Link>
  //     </div>
  //   );
  // };

  // const handleAddToCart = () => {
  //   if (isItemInCart()) {
  //     toast(<ToastContentAlreadyInCart />, {
  //       position: "bottom-center",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       style: {
  //         marginBottom: '82px',
  //         marginRight: '16px',
  //         marginLeft: '16px',
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //         backdropFilter: 'blur(10px)',
  //         WebkitBackdropFilter: 'blur(10px)',
  //         borderRadius: '16px',
  //       }
  //     });
  //   } else {
  //     toast(<ToastContent />, {
  //       position: "bottom-center",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       style: {
  //         marginBottom: '82px',
  //         marginRight: '16px',
  //         marginLeft: '16px',
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //         backdropFilter: 'blur(10px)',
  //         WebkitBackdropFilter: 'blur(10px)',
  //         borderRadius: '16px',
  //       }
  //     });
  //   }
  // };

  return (
    <MyDongleHistoryItemContainer>
      <Image src={imageurl} alt={name} onClick={() => routeToItem(itemId)} />
      <InfoContainer>
        <Info>
          <Name onClick={() => routeToItem(itemId)}>{removeHtmlTags(name)}</Name>
          <CloseSvg onClick={removeItem} style={{ cursor: "pointer" }} />
        </Info>
        <Price onClick={() => routeToItem(itemId)}>
          {price.toLocaleString()} 원
        </Price>
        <Info>
          <OrderDate>{formatDeliveryDate(orderDate)} 구매</OrderDate>
          {/* <CartButton>장바구니 담기</CartButton> */}
        </Info>
      </InfoContainer>
    </MyDongleHistoryItemContainer>
  );
};

export default MyDongleHistoryItem;
