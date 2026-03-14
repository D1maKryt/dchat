"use client";

import type { SubmitEvent } from "react";

import { DIV_PROPERTIES } from "@/properties";
import { Main } from "@/layout";

import { Button, Input } from "tvuikit";

import Link from "next/link";

import { login } from "@/api/login";

const Page = () => {
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login: username, password } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    const user = await login({
      username: username.toString(),
      password: password.toString(),
    });

    console.log({ user });
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
    </Main>
  );
};

export default Page;
