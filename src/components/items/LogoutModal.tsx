// LogoutModal.tsx
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogOutButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background-color: black;
  color: white;
`;

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  border: solid 1px #D9D9D9;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  color: black;
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #9D9D9D;
`;

interface LogoutModalProps {
    onClose: () => void;
    onLogout: () => void;
}

function LogoutModal({ onClose }: LogoutModalProps) {
    const router = useRouter();

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/home');
    };

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalText>로그아웃 하시겠어요? 😿</ModalText>
                <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
                <CancelButton onClick={onClose}>취소</CancelButton>
            </ModalContainer>
        </ModalBackdrop>
    );
}

export default LogoutModal;