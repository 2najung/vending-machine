import React from "react";
import styled from "styled-components";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ConfirmModal = ({ message, onClose }: ModalProps) => {
  return (
    <ModalContainer>
      <ModalContent>
        <p>{message}</p>
        <ModalButton onClick={onClose}>닫기</ModalButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ConfirmModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  white-space: pre-line;
  width: 80%;
`;

const ModalButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #388e3c;
  }
`;
