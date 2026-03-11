"use client"

import { Footer, Header } from "@/layout";

import "tvuikit/index.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-shiftshift-theme="system"
      data-shiftshift-double-shift="false"
      lang="ru"
    >
      <body
        className={[
          "flex flex-col min-h-screen",
        ].join(" ")}
      >
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
