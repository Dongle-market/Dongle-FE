import React, { useState } from 'react';
import styled from 'styled-components';
import HeartSvg from '/public/svgs/element/heart.svg'
import FullHeartSvg from '/public/svgs/element/heart_full.svg'

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
    padding-top: 100%; /* 정사각형 비율 유지 */
    overflow: hidden;
    border-radius: 4px;
`;

const Thumbnail = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 정사각형으로 채우기 */
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
`;

const Price = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 4px;
`;

interface ItemCardProps {
    item: Item;
}

export default function CategoryItem({ item }: ItemCardProps) {
    const [isLiked, setIsLiked] = useState(false);

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
