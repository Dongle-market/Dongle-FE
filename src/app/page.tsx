// /pages.tsx
import MainHeader from "@/components/header/MainHeader";
import FooterNav from "@/components/navbar/MainFooterNav";
import MenuBar from "@/components/header/MenuBar";
import Banner from "@/components/main/Banner";

export default function Home() {
  return (
    <div className="page">
      <div className="mainpage">
        <MainHeader /> 
        <MenuBar />
        <Banner />
        <main className="main">여기는 메인페이지 입니다!!!</main>
        <footer className="footer">푸터영역입니다.</footer>
        <FooterNav />
      </div>
    </div>
  );
}
