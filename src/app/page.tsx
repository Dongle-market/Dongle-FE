// pages.tsx
import MainHeader from "@/components/layout/MainHeader";
import FooterNav from "@/components/layout/MainFooterNav";

export default function Home() {
  return (
    <div className="page">
      <MainHeader />
      <main className="main">마지막.. 소스트리 테스트합니다 양해 감사합니다..</main>
      <footer className="footer">푸터영역입니다.</footer>
      <FooterNav />
    </div>
  );
}
