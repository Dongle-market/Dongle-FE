import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "동글",
  description: "반려견을 위한, 동글마켓",
};

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className}`}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
