// CategoryItem.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import HeartSvg from '/public/svgs/element/heart.svg'
import FullHeartSvg from '/public/svgs/element/heart_full.svg'
import SelectPets from './SelectPets';

interface Item {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

const Card = styled.div`
    width: 100%;
`;

const ThumbnailWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 4px;
`;

const Thumbnail = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const HeartIconWrapper = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const Info = styled.div`
    margin-top: 8px;
`;

const Name = styled.div`
    font-size: 14px;
    margin: 0;
    height: 38px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
`;

const Price = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 4px;
`;

interface ItemCardProps {
    item: Item;
    defaultLiked?: boolean;
}

export default function CategoryItem({ item, defaultLiked = false }: ItemCardProps) {
    const [isLiked, setIsLiked] = useState(defaultLiked);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Card>
            <ThumbnailWrapper>
                <Thumbnail src={item.imageUrl} alt={item.name} />
                <HeartIconWrapper onClick={toggleLike}>
                    {isLiked ? <FullHeartSvg /> : <HeartSvg />}
                </HeartIconWrapper>
            </ThumbnailWrapper>
            <Info>
                <Name>{item.name}</Name>
                <Price>{item.price.toLocaleString()} 원</Price>
            </Info>
        </Card>
    );
}

interface CategoryItemWrapperProps {
    item: Item;
    hasAdditionalElement?: boolean;
    defaultLiked?: boolean;
}

const CategoryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export function CategoryItemWrapper({ item, hasAdditionalElement = false, defaultLiked = false }: CategoryItemWrapperProps) {
    return (
        <CategoryItemContainer>
            <CategoryItem item={item} defaultLiked={defaultLiked}/>
            {hasAdditionalElement && <SelectPets />}
        </CategoryItemContainer>
    );
}
