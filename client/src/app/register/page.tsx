"use client"

import type { SubmitEvent } from "react";

import { Main } from "@/layout"
import { DIV_PROPERTIES } from "@/properties";

import { Button, Input } from "tvuikit";

import Link from "next/link";

const Page = () => {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const { email, username, password } = Object.fromEntries(new FormData(event.currentTarget).entries());
  }

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <div className="flex flex-col items-center">
          <h5>Регистрация аккаунта</h5>
          <span className="text-mini">Уже есть аккаунт? <Link href="/login">Войти</Link></span>
        </div>

        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <span>Username</span>
            <Input
              name="username"
              placeholder="coolusername34"
              required
            />
          </div>

          <div className="flex flex-col">
            <span>Email</span>
            <Input
              name="email"
              type="email"
              placeholder="cool@gmail.com"
              required
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

          <Button
            type="submit"
            className="w-full"
          >Submit</Button>
        </form>
      </div>
    </Main>
  )
}

export default Page;
