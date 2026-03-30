"use client";

import { useRouter } from "next/navigation";
import { Button } from "tvuikit";

export const RegisterHeader = () => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/login")}>Войти</Button>
      <Button onClick={() => router.push("/register")}>
        Зарегистрироваться
      </Button>
    </>
  );
};
