"use client";

import { Button } from "tvuikit";

import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header
      className={[
        "bg-(--bg-section) rounded-2xl",
        "flex justify-between items-center p-4 m-4",
      ].join(" ")}
    >
      <h3>D Chat</h3>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/login")}>Войти</Button>

        <Button onClick={() => router.push("/register")}>
          Зарегистрироваться
        </Button>
      </div>
    </header>
  );
};
