import PaymentsHeader from "@/components/header/PaymentsHeader";
import { patchOrderStatus } from "@/services/payments/payments";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ConfirmTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 70vh;
`

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

export default function SuccessPage() {
  const router = useRouter();
  const { orderId, amount } = router.query;
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    orderId && typeof orderId === 'string' &&
      patchOrderStatus(parseInt(orderId)).then(() => {
        setIsFinished(true);
      }).catch(() => {
        throw new Error();
      })

    sessionStorage.removeItem('cartItems');
  }, [orderId]);

  function formatAmount(amount: string | string[] | undefined): string {
    if (Array.isArray(amount)) {
      amount = amount.length > 0 ? amount[0] : '';
    } else if (amount === undefined) {
      amount = '';
    }

    return parseInt(amount).toLocaleString();
  }

  return (
    <div className="page">
      <PaymentsHeader itemCount={5} />
      <div className='content'>
        <ConfirmTextContainer>
          <h2>주문이 완료되었어요.</h2>
          <div>주문번호: {orderId}</div>
          <div>결제금액: {formatAmount(amount)}원</div>
        </ConfirmTextContainer>
        {isFinished ? (
          <ConfirmButton onClick={() => router.push('/mymarket/history')}>돌아가기</ConfirmButton>
        ) : (
          <NonConfirmButton>돌아가기</NonConfirmButton>
        )}
      </div>
    </div>
  );
}