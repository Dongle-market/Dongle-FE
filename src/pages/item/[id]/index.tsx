// item/index.tsx

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import InfoSection from "@/components/items/ItemInfo";
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { ItemAPI } from "@/services/item/item";
import { useRouter } from "next/router";
import { removeHtmlTags } from "@/utils/removeHtmlTags";
import FallbackComponent from "@/components/common/Fallback";
import LoadingComponent from "@/components/common/Loading";

const categoryMap: { [key: string]: string } = {
    food: "사료",
    snack: "간식",
    product: "용품",
    wet: "습식사료",
    dry: "건식사료",
    soft: "소프트사료",
    can: "캔/통조림",
    hand: "수제간식",
    //more than.....
    
};

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 390px;
    border-radius: 4px;
    overflow: hidden;
`;

const ItemImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const DetailTitle = styled.div`
    padding: 16px;
    font-size: 20px;
    font-weight: 600;
`;

const DetailImage = styled.img`
    width: 100%;
`;

const SkeletonImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`


interface Item {
    itemId: number;
    image: string;
    title: string;
    lprice: number;
    brand: string;
    category: {
      mainCategory: string;
      subCategory: string;
      species: string;
    };
  }

export default function ItemPage() {
    const profileImages = [
        "/images/catdongle.jpeg",
        "/images/gom.jpeg",
        "/images/soogom.jpeg",
    ];

    const router = useRouter();
    const { id } = router.query;  // URL에서 id 가져오기
    const [item, setItem] = useState<Item>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {  // id가 정의되었을 때만 실행
                try {
                    const data = await ItemAPI.fetchItemById(Number(id));
                    setItem(data);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) return (
        <LoadingComponent>
            <SkeletonImage src="/images/skeleton/itempage_skeleton.png" alt="skeleton" />
        </LoadingComponent>
    );
    if (!item) return <FallbackComponent />;

    const getCategoryName = (key: string): string => {
        return categoryMap[key] || key; // 매핑되지 않은 경우 원래 값 반환
    };

    return (
        <div className="page">
            <Header />
            <div className="content">
                <ImageWrapper>
                    <ItemImage
                        src={item.image} alt={item.title}
                    />
                </ImageWrapper>
                <InfoSection
                    categories={[
                        getCategoryName(item.category.mainCategory),
                        getCategoryName(item.category.subCategory)
                    ]}
                    brand={item.brand}
                    productName={removeHtmlTags(item.title)}
                    price={item.lprice}
                />
                <DetailTitle>
                    상품설명
                </DetailTitle>
                <DetailImage src="https://shopping-phinf.pstatic.net/20200521_09_28/2968b9a2-aedf-4eda-84c8-cb09b81dae01/C:UsersuserDesktopb1ac3b5d07c1052752f6e75cb610e13d_092143.jpg"
                    alt="Product Detail Image" />
            </div>
            <FooterNav
                item={{
                    itemId: item.itemId,
                    imageUrl: item.image,
                    price: item.lprice,
                    brand: item.brand,
                    name: item.title,
                    itemCount: 1
                }} 
                profileImages={profileImages}
            />
        </div>
    );
}
