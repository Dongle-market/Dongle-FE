import PaymentsHeader from "@/components/header/PaymentsHeader";
import { patchOrderStatus } from "@/services/payments/payments";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HistoryItem from "@/components/items/HistoryItem";
import { getOrderInfo } from "@/services/order/order";
import { Order } from "@/services/order/order.type";
import BigRocketSvg from "../../../public/svgs/element/rocket_big.svg";

const initialCartItems = [
  { id: 1, imageurl: '/images/Son&Jeon.png', name: '왜저뤠ㅞㅞ~~', price: 34000 },
  { id: 2, imageurl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
  { id: 3, imageurl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
  { id: 4, imageurl: '/images/An.png', name: '보류입니다.', price: 34000 },
  { id: 5, imageurl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
  { id: 6, imageurl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
  { id: 7, imageurl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 8, imageurl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 9, imageurl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
  { id: 10, imageurl: '/images/product1.png', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000 }
];

const DateGroupContainer = styled.div`
  margin-bottom: 12px;
  padding: 16px;
  background-color: #FFFFFF;
`;

const DeliveryText = styled.div`
  font-size: 32px;
  color: #47DE60;;
  text-align: center;
`;

const DeliveryTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const OrderItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #D9D9D9;
  border-radius: 8px;
  padding: 0 16px;
  margin-top: 16px;
  max-height: 360px;
  overflow-y: auto;
`;

const AllOrderCancelText = styled.div`
  display: flex;
  font-size: 16px;
  color: #D9D9D9;
  text-align: center;
  margin-top: 16px;
`;

const ConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 120px;
  width: calc(100% - 32px);
  height: 40px;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  color: white;
  background-color: #ED6648;
  box-sizing: border-box;
  cursor: pointer;
`

const NonConfirmButton = styled(ConfirmButton)`
  background-color: #BCBCBC;
  cursor: none;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const OrderCompleteText = styled.div`
  font-size: 24px;
  color: #352412;
  font-weight: 600;
`;

const TextWrappper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;

const OrderText = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 400;
`;

function formatAmount(amount: string | string[] | undefined): string {
  if (Array.isArray(amount)) {
    amount = amount.length > 0 ? amount[0] : '';
  } else if (amount === undefined) {
    amount = '';
  }

  return parseInt(amount).toLocaleString();
}

function getNextDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toLocaleString('ko-KR', { weekday: 'short' }).charAt(0);
}

export default function SuccessPage() {
  const router = useRouter();
  const { orderId, amount } = router.query;
  const [isFinished, setIsFinished] = useState(false);
  const [cartItems] = useState(initialCartItems);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log("orderId:", orderId);
    const loadOrders = async () => {
      try {
        const orderData: Order[] = await getOrderInfo();
        setOrders(orderData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    if (orderId !== undefined && typeof orderId === 'string') {
      patchOrderStatus(parseInt(orderId)).then(() => {
        setIsFinished(true);
        return;
      }).catch(() => {
        throw new Error();
      })
    }
    sessionStorage.removeItem('cartItems');
  }, [orderId]);

  const handleDeleteSuccess = (orderItemId: number) => {
    // 삭제 시 orderItemId로 필터링
    setOrders(orders => orders.map(order => ({
      ...order,
      orderItems: order.orderItems.filter(item => item.orderItemId !== orderItemId)
    })));
  };

  return (
    <div className="page">
      <PaymentsHeader />
      <div className='content'>
          {orders && orders.length > 0 ? (
            orders.filter(order => order.orderId.toString() === orderId).map((order) => (
              <DateGroupContainer key={order.orderId}>
                <DeliveryTextWrapper>
                  <BigRocketSvg />
                  <DeliveryText>{`내일(${getNextDayOfWeek(order.orderDate)}) 도착 보장`}</DeliveryText>
                </DeliveryTextWrapper>
                {order.orderItems.length > 0 ? (
                  <OrderItemContainer>
                    {order.orderItems.map(item => (
                      <HistoryItem
                        key={item.itemId}
                        itemId={item.itemId}
                        orderId={order.orderId}
                        orderItemId={item.orderItemId}
                        imageurl={item.image}
                        name={item.title}
                        price={item.price}
                        orderDate={order.orderDate}
                        selectedPetIds={item.pets}
                        amount={item.itemCount}
                        cartItems={cartItems}
                        onDeleteSuccess={() => handleDeleteSuccess(item.itemId)}
                      />
                    ))}
                  </OrderItemContainer>
                ) : (
                  <AllOrderCancelText>결제오류🚨</AllOrderCancelText>
                )}
              </DateGroupContainer>
            ))
          ) : (
            <span>주문 확인중...</span>
          )}
          <TextContainer>
            <OrderCompleteText>주문이 완료되었어요🐶</OrderCompleteText>
            <TextWrappper>
              <OrderText>주문번호: {orderId}</OrderText>
              <OrderText>결제금액: {formatAmount(amount)}원</OrderText>
            </TextWrappper>
          </TextContainer>
        {isFinished ? (
          <ConfirmButton onClick={() => router.push('/mymarket/history')}>돌아가기</ConfirmButton>
        ) : (
          <NonConfirmButton>돌아가기</NonConfirmButton>
        )}
      </div>
    </div>
  );
}