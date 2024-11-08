// MainItem.tsx

import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;

const SkeletonItem = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

const SkeletonImage = styled(SkeletonItem)`
  width: 120px;
  height: 120px;
  border-radius: 8px;
`;

const Price = styled(SkeletonItem)`
  width: 50%;
  height: 17px;
  background-color: #818181;
  border-radius: 4px;
  margin-top: 4px;
`;

const Name = styled(SkeletonItem)`
  width: 100%;
  height: 34px;
  margin-top: 8px;
  background-color: #d9d9d9;
  border-radius: 4px;
`;

const EmptyMainItem = () => {
    return (
        <ItemContainer>
            <SkeletonImage/>
            <Name />
            <Price />
        </ItemContainer>
    );
};

export default EmptyMainItem;