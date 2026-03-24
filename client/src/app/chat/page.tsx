"use client";

import type { User } from "@/types";

import { CircleProgress } from "tvuikit";
import { Main } from "@/layout";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "@/api/user";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        return router.push("/register");
      }

      setUser(user);
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) {
    return (
      <Main itemsCenter>
        <CircleProgress />
      </Main>
    );
  }

  if (!user) {
    return router.push("/register");
  }

  return <Main>Привет, {user.name}!</Main>;
};

export default Page;
