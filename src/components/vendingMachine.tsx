import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./menu";
import Payment from "./payment";
import ConfirmModal from "./modal/confirmModal";
import ColaImg from "../assets/cola.png";
import CoffeeImg from "../assets/coffee.png";
import WaterImg from "../assets/water.png";
import { Drink } from "../types";

const initialDrinks: Drink[] = [
  { name: "콜라", price: 1100, stock: 11, img: ColaImg },
  { name: "물", price: 600, stock: 6, img: WaterImg },
  { name: "커피", price: 700, stock: 7, img: CoffeeImg },
];

const VendingMachine = () => {
  const [drinks, setDrinks] = useState<Drink[]>(initialDrinks);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"현금" | "카드" | null>(
    null
  );
  const [insertedMoney, setInsertedMoney] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const resetState = () => {
    setSelectedDrink(null);
    setPaymentMethod(null);
    setInsertedMoney(0);
    setMessage("");
  };

  const selectDrink = (drink: Drink) => {
    if (!paymentMethod) {
      setMessage("결제 수단을 먼저 선택해주세요.");
      return;
    }

    if (drink.stock <= 0) {
      setMessage("선택하신 제품의 재고가 없습니다.");
    } else {
      setSelectedDrink(drink);
      setMessage(`${drink.name} 선택. 구매하기를 눌러주세요.`);
    }
  };

  const updateStock = (drinkName: string) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((drink) =>
        drink.name === drinkName ? { ...drink, stock: drink.stock - 1 } : drink
      )
    );
  };

  const handlePaymentMethod = (method: "현금" | "카드") => {
    setPaymentMethod(method);
    setMessage(`${method}결제 선택`);
  };

  const handleCancle = () => {
    setMessage("구매가 취소되었습니다.");
    resetState();
  };

  const insertCash = (amount: number) => {
    if (paymentMethod !== "현금") {
      setMessage("결제 수단을 먼저 선택해주세요.");
      return;
    }
    setInsertedMoney((prev) => prev + amount);
  };

  const confirmPurchase = () => {
    if (!selectedDrink) {
      setMessage("음료를 먼저 선택해주세요.");
      return;
    }

    if (paymentMethod === "현금") {
      if (insertedMoney < selectedDrink.price) {
        setMessage("금액이 부족합니다. 현금을 더 투입하거나 취소해주세요.");
      } else {
        const change = insertedMoney - selectedDrink.price;
        setModalMessage(
          `${selectedDrink.name} 구매가 완료되었습니다. \n거스름돈: ${change}원`
        );
        setShowModal(true);
        setInsertedMoney(0);
        updateStock(selectedDrink.name);
        resetState();
      }
    } else if (paymentMethod === "카드") {
      setModalMessage(`${selectedDrink.name} 구매가 완료되었습니다.`);
      setShowModal(true);
      updateStock(selectedDrink.name);
      resetState();
    }
  };

  return (
    <VendingMachineContainer>
      <Screen>
        <h1>자판기</h1>
        <Message>{message}</Message>
      </Screen>
      <Menu
        drinks={drinks}
        selectDrink={selectDrink}
        paymentMethod={paymentMethod}
      />
      <Payment
        paymentMethod={paymentMethod}
        handlePaymentMethod={handlePaymentMethod}
        insertCash={insertCash}
        insertedMoney={insertedMoney}
      />
      <PurchaseContainer>
        <Button onClick={confirmPurchase}>구매하기</Button>
        <Button onClick={handleCancle}>구매 취소</Button>
      </PurchaseContainer>
      {showModal && (
        <ConfirmModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </VendingMachineContainer>
  );
};

export default VendingMachine;

const VendingMachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 900px;
  background-color: #eb4545;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const Screen = styled.div`
  width: 100%;
  color: white;
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
`;

const PurchaseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 10px;
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #a3a3a3;
  }
`;

const Message = styled.h3`
  color: #ffffff;
  font-size: 18px;
`;
