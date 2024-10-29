// item/page.tsx

'use client';

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import InfoSection from "@/components/items/ItemInfo";
import styled from 'styled-components';
import Link from "next/link";

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 390px;
    border-radius: 4px;
    overflow: hidden;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function Home() {

    const profileImages = [
        "https://via.placeholder.com/24x24.png?text=%20",
        "https://via.placeholder.com/24x24.png?text=%20",
        "https://via.placeholder.com/24x24.png?text=%20",
      ];

    return (
        <div className="page">
            <Header />
            <div className="content">
                <ImageWrapper>
                    <Image
                        src="https://shopping-phinf.pstatic.net/main_1456236/14562361991.20240903141927.jpg"
                        alt="Product Image"
                    />
                </ImageWrapper>
                <InfoSection
                    categories={['사료', '건식사료']}
                    brand="now"
                    productName="NOW 그레인프리 스몰브리드 시니어"
                    price={44900}
                />
            </div>
            <FooterNav price={44900} profileImages={profileImages} />
        </div>
    );
}
