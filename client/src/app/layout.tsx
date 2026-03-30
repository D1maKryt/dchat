"use client";

import type { User } from "@/types";

import { Footer, Header } from "@/layout";

import { getUser } from "@/api/user";

import { CircleProgress } from "tvuikit";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import "tvuikit/index.css";
import "./globals.css";

const NOLAYOUT_PATHS = [/\/chat\/.*/];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return (
      <html
        data-shiftshift-theme="system"
        data-shiftshift-double-shift="false"
        lang="ru"
      >
        <body
          className={[
            "flex flex-col min-h-screen items-center justify-center",
          ].join(" ")}
        >
          <CircleProgress size={48} />
        </body>
      </html>
    );
  }

  const isNolayoutPath = NOLAYOUT_PATHS.some((path) => path.test(pathname));
  if (isNolayoutPath) {
    return (
      <html
        data-shiftshift-theme="system"
        data-shiftshift-double-shift="false"
        lang="ru"
      >
        <body className={["py-8 px-4"].join(" ")}>{children}</body>
      </html>
    );
  }

  return (
    <html
      data-shiftshift-theme="system"
      data-shiftshift-double-shift="false"
      lang="ru"
    >
      <body className={["flex flex-col min-h-screen"].join(" ")}>
        <Header user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
