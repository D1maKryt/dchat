"use client"

import { ThemeProvider } from "@mui/material";

import { Footer, Header } from "@/layout";
import { theme } from "@/config";

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
        <ThemeProvider theme={theme}>
          <Header></Header>
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
