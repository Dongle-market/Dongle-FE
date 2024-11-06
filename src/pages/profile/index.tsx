// /profile/index.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import UserHeader from '@/components/header/CategoryHeader';
import UserInfoFooterNav from '@/components/navbar/UserInfoFooterNav';
import PassPort from '@/components/items/PassPort';
import LogoutModal from '@/components/items/LogoutModal';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 32px;
`;

const MyProfileTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    /* color: #352412; */
    color: #0B0D83;
    text-align: center;
`;

const LogOutButton = styled.div`
  width: 100%;
  height: 40px;
  background-color: transparent;
  color: #9D9D9D;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-top: 16px;
  text-decoration: underline;
`;

export default function ProfilePage() {
    const [showModal, setShowModal] = useState(false);
  
    const handleLogoutClick = () => {
      setShowModal(true);
    };
  
    const handleClose = () => {
      setShowModal(false);
    };
  
    const handleLogout = () => {
      console.log("로그아웃 처리");
      setShowModal(false);
      window.location.href = '/';
    };

    return (
        <div className="page">
            <UserHeader />
            <div className='content'>
                <Wrapper>
                    <MyProfileTitle>IDENTIFICATION CARD</MyProfileTitle>
                    <PassPort />
                </Wrapper>
                <LogOutButton onClick={handleLogoutClick}>로그아웃</LogOutButton>
                {showModal && <LogoutModal onClose={handleClose} onLogout={handleLogout} />}
            </div>
            <UserInfoFooterNav />
        </div>
    );
}