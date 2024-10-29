// item/page.tsx

'use client';

import Header from "@/components/header/ItemHeader";
import FooterNav from "@/components/navbar/ItemFooter";
import styled from 'styled-components';
import Link from "next/link";




export default function Home() {
    return (
        <div className="page">
            <Header />
            <FooterNav price={44900} />
        </div>
    );
}
