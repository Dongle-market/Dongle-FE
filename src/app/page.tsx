// pages.tsx
import MainHeader from "@/components/layout/MainHeader";
import FooterNav from "@/components/layout/FooterNav";

export default function Home() {
  return (
    <div className="page">
      <MainHeader /> 
      <main className="main">테스트 페이지 입니다!!!</main>
      <footer className="footer">푸터영역입니다.</footer>
      <FooterNav />
    </div>
  );
}
