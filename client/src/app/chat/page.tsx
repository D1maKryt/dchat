"use client";

import type { ChatRoom, User } from "@/types";
import type { SubmitEvent } from "react";

import { Button, CircleProgress, Input } from "tvuikit";
import { Main } from "@/layout";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMe } from "@/api/get-user";
import { getToken } from "@/api/token";
import { findChat } from "@/api/find-chat";

import { DIV_PROPERTIES } from "@/properties";
import { WEBSCOKET_URL } from "@/constants";

import { io } from "socket.io-client";

const Page = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const user = await getMe();
      const token = await getToken();
      if (!user || !token) {
        return router.push("/register");
      }

      setUser(user);
      setToken(token);
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const websocket = io(WEBSCOKET_URL.href, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { chatId } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    if (!chatId) {
      return;
    }

    const id = chatId.toString();
    const chat = await findChat(id);
    if (chat) {
      return router.push(`/chat/${chat.id}`);
    }

    websocket.emit("create", id, (chat: ChatRoom) => {
      return router.push(`/chat/${chat.id}`);
    });
  };

  if (!loaded) {
    return (
      <Main itemsCenter>
        <CircleProgress />
      </Main>
    );
  }

  if (!user || !token) {
    return router.push("/register");
  }

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        <h2>Присоединение к чату</h2>
        <div className="flex flex-col items-center">
          <span>
            Чтобы присоединиться к чату, вам нужен уникальный идентификатор
          </span>
          <span>Если чат не будет найден, то мы его создадим</span>
        </div>

        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input name="chatId" id="chatId" placeholder="Chat ID or name" />
          <Button type="submit">Join or Create</Button>
        </form>
      </div>
    </Main>
  );
};

export default Page;
