import PaymentsHeader from "@/components/header/PaymentsHeader";
import { patchOrderStatus } from "@/services/payments/payments";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HistoryItem from "@/components/items/HistoryItem";
import { getOrderInfo } from "@/services/order/order";
import { Order } from "@/services/order/order.type";
import RocketSuccessSvg from "../../../public/svgs/element/rocket_success.svg";

const DateGroupContainer = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  background-color: #FFFFFF;
`;

const RocketText = styled.div`
  font-size: 20px;
  color: #35241E;
  font-weight: 600;
`;

const DeliveryText = styled.div`
  font-size: 20px;
  color: #47DE60;;
  text-align: center;
`;

const OwnerText = styled.div`
  font-size: 12px;
  color: #35241E;
  padding-left: 4px;
`;

const RocketTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  bottom: 120px;
  width: calc(100% - 32px);
  height: 40px;
  padding: 16px;
  margin: 32px 16px;
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

const OrderCompleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 4px;
`;

const OrderCompleteText = styled.div`
  font-size: 20px;
  color: black;
`;

const OrderCompleteBoldText = styled.div`
  font-size: 20px;
  color: black;
  font-weight: 600;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  margin: 0 16px;
  box-sizing: border-box;
  width: calc(100% - 32px);
  border-top: 1px solid #D9D9D9;
  border-bottom: 1px solid #D9D9D9;
`;

const TotalPriceText = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 600;
`;

const PayDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const PayDetailText = styled.div`
  font-size: 12px;
  color: #9D9D9D;
`;

const TotalAmount = styled.div`
  font-size: 16px;
  color: red;
  font-weight: 600;
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
        <OrderCompleteWrapper>
          <OrderCompleteBoldText>주문이 완료</OrderCompleteBoldText>
          <OrderCompleteText>되었습니다. 감사합니다🐶</OrderCompleteText>
        </OrderCompleteWrapper>
        {orders && orders.length > 0 ? (
          orders.filter(order => order.orderId.toString() === orderId).map((order) => (
            <DateGroupContainer key={order.orderId}>
              <TitleWrapper>
                <DeliveryTextWrapper>
                  <RocketTextWrapper>
                    <RocketSuccessSvg />
                    <RocketText>동글로켓배송</RocketText>
                  </RocketTextWrapper>
                  <DeliveryText>{`내일(${getNextDayOfWeek(order.orderDate)}) 도착 보장`}</DeliveryText>
                </DeliveryTextWrapper>
                <OwnerText>판매자: 동글마켓 | 주문번호: {orderId}</OwnerText>
              </TitleWrapper>
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
                      petList={[]}
                      amount={item.itemCount}
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
        <TotalPriceContainer>
          <TotalPriceText>총 결제금액</TotalPriceText>
          <PayDetailContainer>
            <PayDetailText>동글페이 / 일시불</PayDetailText>
            <TotalAmount>{formatAmount(amount)}원</TotalAmount>
          </PayDetailContainer>
        </TotalPriceContainer>
        {isFinished ? (
          <ConfirmButton onClick={() => router.push('/mymarket/history')}>돌아가기</ConfirmButton>
        ) : (
          <NonConfirmButton>돌아가기</NonConfirmButton>
        )}
      </div>
    </div>
  );
}