'use client';

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { TossRequestType } from "./payments.type";

const tossClientKey: string = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const tossCustomerKey: string = process.env.NEXT_PUBLIC_TOSS_CUSTOMER_KEY || '';
const tossPayments = await loadTossPayments(tossClientKey);
const payment = tossPayments.payment({ customerKey: tossCustomerKey });

/** 토스 결제창 열기 */
export const requestPayment = async ({
  amountValue,
  orderId,
  orderName,
  customerName,
  customerMobilePhone,
}: TossRequestType) => {
  await payment.requestPayment({
    method: "CARD", // 카드 결제
    amount: {
      currency: "KRW",
      value: amountValue,
    },
    orderId: orderId, // 고유 주분번호
    orderName: orderName,
    successUrl: window.location.origin + "/success", // 결제 요청이 성공하면 리다이렉트되는 URL
    failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
    customerEmail: "customer123@gmail.com",
    customerName: customerName,
    customerMobilePhone: customerMobilePhone,
    // 카드 결제에 필요한 정보
    card: {
      useEscrow: false,
      flowMode: "DEFAULT", // 통합결제창 여는 옵션
      useCardPoint: false,
      useAppCardOnly: false,
    },
  })
}