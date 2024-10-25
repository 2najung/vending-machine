import React from "react";
import styled from "styled-components";

interface PaymentProps {
  paymentMethod: "현금" | "카드" | null;
  handlePaymentMethod: (method: "현금" | "카드") => void;
  insertCash: (amount: number) => void;
  insertedMoney: number;
}

const Payment = ({
  paymentMethod,
  handlePaymentMethod,
  insertCash,
  insertedMoney,
}: PaymentProps) => {
  return (
    <PaymentContainer>
      <h2>결제 수단 선택</h2>
      <Button>
        <PaymentButton onClick={() => handlePaymentMethod("현금")}>
          현금
        </PaymentButton>
        <PaymentButton onClick={() => handlePaymentMethod("카드")}>
          카드
        </PaymentButton>
      </Button>
      {paymentMethod === "현금" && (
        <CashContainer>
          <h2>현금 투입</h2>
          <Button>
            {[100, 500, 1000, 5000, 10000].map((amount) => (
              <CashButton key={amount} onClick={() => insertCash(amount)}>
                {amount}원
              </CashButton>
            ))}
          </Button>
          <p>넣은 금액: {insertedMoney}원</p>
        </CashContainer>
      )}
    </PaymentContainer>
  );
};

export default Payment;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: 800;
  }
`;

const Button = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const PaymentButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #1976d2;
  }
  font-size: 18px;
`;

const CashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CashButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #e68a00;
  }
  font-size: 18px;
`;
