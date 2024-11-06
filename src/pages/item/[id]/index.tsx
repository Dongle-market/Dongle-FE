// item/index.tsx

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import InfoSection from "@/components/items/ItemInfo";
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { ItemAPI } from "@/services/item/item";
import { useRouter } from "next/router";
import { removeHtmlTags } from "@/utils/removeHtmlTags";

interface CartItem {
    id: number;
    imageUrl: string;
    brand: string
    name: string;
    price: number;
    selected: boolean;
};

const initialItems: CartItem[] = [
    { id: 1, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: true },
    { id: 2, imageUrl: '/images/Baek.png', brand: '아디다스', name: '어얼얽--', price: 34000, selected: true },
    { id: 3, imageUrl: '/images/An.png', brand: '아디다스', name: '고기가 이븐하게 익지 않아써여', price: 34000, selected: true },
    { id: 4, imageUrl: '/images/An.png', brand: '아디다스', name: '보류입니다.', price: 34000, selected: true },
    { id: 5, imageUrl: '/images/An.png', brand: '아디다스', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000, selected: true },
    { id: 6, imageUrl: '/images/Baek.png', brand: '아디다스', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000, selected: true },
    { id: 7, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 8, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 9, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스', price: 34000, selected: false },
    { id: 10, imageUrl: '/images/product1.png', brand: '아디다스', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000, selected: false },
    { id: 11, imageUrl: '/images/Son&Jeon.png', brand: '아디다스', name: '왜저뤠ㅞㅞ~~', price: 34000, selected: false }
];

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
    const [items, ] = useState<CartItem[]>(initialItems);

    const profileImages = [
        "/images/catdongle.jpeg",
        "/images/gom.jpeg",
        "/images/soogom.jpeg",
    ];

    const router = useRouter();
    const { id } = router.query;  // URL에서 id 가져오기
    const [item, setItem] = useState<Item>();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {  // id가 정의되었을 때만 실행
                try {
                    const data = await ItemAPI.fetchItemById(Number(id));
                    setItem(data);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            }
        };
        fetchData();
    }, [id]);

    if (!item) return <div>Loading...</div>;

    const getCategoryName = (key: string): string => {
        return categoryMap[key] || key; // 매핑되지 않은 경우 원래 값 반환
    };

    return (
        <div className="page">
            <Header itemCount={items.length} />
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
