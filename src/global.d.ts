declare module '@tosspayments/tosspayments-sdk' {
  export function loadTossPayments(clientKey: string): Promise<TossPayments>;

  export interface TossPayments {
    payment(options: { customerKey: string }): Payment;
  }

  export interface Payment {
    requestPayment(options: RequestPaymentOptions): Promise<void>;
  }

  export interface RequestPaymentOptions {
    method: string;
    amount: {
      currency: string;
      value: number;
    };
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail: string;
    customerName: string;
    customerMobilePhone: string;
    card?: {
      useEscrow: boolean;
      flowMode: string;
      useCardPoint: boolean;
      useAppCardOnly: boolean;
    };
  }
}