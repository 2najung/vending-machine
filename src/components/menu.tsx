import React from "react";
import styled from "styled-components";
import { Drink } from "../types";

interface MenuProps {
  drinks: Drink[];
  selectDrink: (drink: Drink) => void;
  paymentMethod: "현금" | "카드" | null;
}

const Menu = ({ drinks, selectDrink, paymentMethod }: MenuProps) => {
  return (
    <MenuContainer>
      {drinks.map((drink) => (
        <DrinkItem key={drink.name}>
          <DrinkImage src={drink.img} />
          <StockInfo>재고: {drink.stock}</StockInfo>
          <DrinkButton
            disabled={!paymentMethod}
            onClick={() => selectDrink(drink)}
          >
            <div>{drink.name}</div>
            <div>{drink.price}원</div>
          </DrinkButton>
        </DrinkItem>
      ))}
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px 10px;
  gap: 15px;
`;

const DrinkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DrinkImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
`;

const StockInfo = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

const DrinkButton = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#d3d3d3" : "#61b165")};
  color: white;
  border: none;
  padding: 15px;
  font-size: 15px;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-align: center;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d3d3d3" : "#2b6e2d")};
  }
  border-radius: 10px;
`;
