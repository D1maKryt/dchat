"use client";

import { useState, type SubmitEvent } from "react";

import { DIV_PROPERTIES } from "@/properties";
import { Main } from "@/layout";

import { Button, Input, Switch, useNotifications } from "tvuikit";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { register } from "@/api/register";

const Page = () => {
  const router = useRouter();

  const [twoFaEnabled, setTwoFaEnabled] = useState<boolean>(false);
  const { NotificationComponent, notificate } = useNotifications({
    duration: 3000,
    delay: 1000,
    allNotificationsEnabled: false,
  });

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    const data = await register({
      username: username.toString(),
      password: password.toString(),
    });

    if (!data) {
      return notificate("Не удалось зарегистрироваться.");
    }

    if (typeof data === "string") {
      return notificate(data);
    }

    if (twoFaEnabled) {
      return router.push("/2fa");
    }

    return router.push("/chat");
  };

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <div className="flex flex-col items-center">
          <h5>Регистрация аккаунта</h5>
          <span className="text-mini">
            Уже есть аккаунт? <Link href="/login">Войти</Link>
          </span>
        </div>

        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <span>Username</span>
            <Input name="username" placeholder="coolusername34" required />
          </div>

          <div className="flex flex-col w-full gap-1">
            <span>Включить 2FA?</span>
            <Switch
              onClick={() => setTwoFaEnabled((previous) => !previous)}
              className="bg-(--bg-default)"
            />
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
