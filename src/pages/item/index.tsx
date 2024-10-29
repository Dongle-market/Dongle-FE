// item/page.tsx

'use client';

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import styled from 'styled-components';
import Link from "next/link";




export default function Home() {

    const profileImages = [
        "https://via.placeholder.com/24x24.png?text=%20",
        "https://via.placeholder.com/24x24.png?text=%20",
        "https://via.placeholder.com/24x24.png?text=%20",
        // 추가 프로필 이미지 경로를 배열에 추가
      ];

    return (
        <div className="page">
            <Header />
            <FooterNav price={44900} profileImages={profileImages} />
        </div>
    );
}
