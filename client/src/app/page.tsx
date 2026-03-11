"use client"

import { Main } from "@/layout";
import { DIV_PROPERTIES } from "@/properties";

import Link from "next/link";

const Page = () => {
  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <h4>Добро пожаловать в DChat</h4>
        <p className="max-w-100">
          Это удобный и защищённый анонимный чат для хорошего общения.
        </p>
        <p className="max-w-100">
          Вы можете <Link href={"/anonymus"}>продолжить анонимно</Link> или{" "}
          <Link href={"/register"}>зарегистрироваться</Link>, чтобы пользоваться
          им ещё более удобно, с возможностью сохранения информации.
        </p>
        <p className="text-mini max-w-100">
          (анонимное использование сервиса не даёт возможность сохранять
          информацию, такие как: чаты, настройки, сообщения и другие)
        </p>
      </div>
    </Main>
  );
};

export default Page;
