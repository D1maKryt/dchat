"use client";

import type { TwoFaData, User } from "@/types";
import type { SubmitEvent } from "react";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Main } from "@/layout";
import { DIV_PROPERTIES } from "@/properties";

import { getUser } from "@/api/user";
import { confirmTwoFa, getTwoFa } from "@/api/two-fa";

import { Button, Input } from "tvuikit";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [twoFaData, setTwoFaData] = useState<TwoFaData | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);

      if (!user) {
        setLoaded(true);
        return;
      }

      const twoFa = await getTwoFa(user.name);
      setTwoFaData(twoFa);

      setLoaded(true);
    })();
  }, []);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    const { code } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    const data = await confirmTwoFa(user.name, code.toString());
    console.log({ data });
  };

  if (!loaded) {
    return <Main>Loading...</Main>;
  }

  if (!user || !twoFaData) {
    router.push("/");
    return "";
  }

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <h5>Включение двухфакторной авторизации</h5>
        <img src={twoFaData.qrCode} alt="QR code" />

        <div className="flex flex-col gap-1 items-center">
          <span>или используйте секретный код:</span>
          <span>{twoFaData.secret}</span>
        </div>

        <form
          className="flex flex-col gap-1 items-center"
          onSubmit={handleSubmit}
        >
          <span>После того, как вы получили код, введите его сюда:</span>
          <Input
            name="code"
            placeholder="Введите код сюда"
            maxLength={6}
            minLength={6}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </Main>
  );
};

export default Page;
