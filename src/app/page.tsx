// /pages.tsx
import MainHeader from "@/components/layout/MainHeader";
import FooterNav from "@/components/layout/FooterNav";
import MenuBar from "@/components/MenuBar";
import Banner from "@/components/Banner";

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
