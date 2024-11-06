// components/ItemInfo.tsx

import styled from 'styled-components';
import ForwardSvg from "/public/svgs/element/forward_arrow.svg";

const InfoContainer = styled.div`
    margin-top: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const CategoryContainer = styled.div`
    font-size: 16px;
    color: #919191;
    display: flex;
    align-items: center;
`;

const CategoryItem = styled.span`
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-right: 2px; /* 각 카테고리와 다음 요소 사이에 2px 간격 설정 */
    }
`;

const StyledArrow = styled(ForwardSvg)`
    margin-left: 2px; /* 화살표와 다음 카테고리 사이에 2px 간격 설정 */
`;

const Brand = styled.div`
    font-size: 16px;
    color: #919191;
    font-weight: 600;
`;

const ProductName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #000000;
`;

const PriceContainer = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #000000;
`;

const CategoryLink = styled.span`
    color: #919191;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

interface Category {
    name: string;
    onClick: () => void;
}

interface InfoSectionProps {
    categories: Category[];
    brand: string;
    productName: string;
    price: number;
}

const ItemInfo = ({ categories, brand, productName, price }: InfoSectionProps) => (
    <InfoContainer>
       <CategoryContainer>
            {categories.map((category, index) => (
                <CategoryItem key={index}>
                    <CategoryLink onClick={category.onClick}>
                        {category.name}
                    </CategoryLink>
                    {index < categories.length - 1 && <StyledArrow />}
                </CategoryItem>
            ))}
        </CategoryContainer>
        <Brand>{brand}</Brand>
        <ProductName>{productName}</ProductName>
        <PriceContainer>{price.toLocaleString('ko-KR')} 원</PriceContainer>
    </InfoContainer>
);

export default ItemInfo;
