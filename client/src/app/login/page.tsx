"use client";

import type { SubmitEvent } from "react";

import { DIV_PROPERTIES } from "@/properties";
import { Main } from "@/layout";

import { Button, Input, useNotifications } from "tvuikit";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { login } from "@/api/login";

const Page = () => {
  const router = useRouter();
  const { NotificationComponent, notificate } = useNotifications({
    duration: 3000,
    delay: 1000,
    allNotificationsEnabled: false,
  });

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login: username, password } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    const data = await login({
      username: username.toString(),
      password: password.toString(),
    });

    if (!data) {
      return notificate("Не удалось войти в аккаунт.");
    }

    if (typeof data === "string") {
      return notificate(data);
    }

    return router.push("/chat");
  };

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <div className="flex flex-col items-center">
          <h5>Вход в аккаунт</h5>
          <span className="text-mini">
            Нет аккаунта? <Link href="/login">Регистрация</Link>
          </span>
        </div>

        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <span>Username</span>
            <Input name="login" placeholder="coolusername34" required />
          </div>

          <div className="flex flex-col">
            <span>Password</span>
            <Input
              name="password"
              type="password"
              placeholder="supersecret"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>

      {NotificationComponent}
    </Main>
  );
};

export default Page;
