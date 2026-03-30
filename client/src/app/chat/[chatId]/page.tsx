"use client";

import type { ChatRoom, User } from "@/types";
import type { SubmitEvent } from "react";

import { Button, CircleProgress, Input } from "tvuikit";
import { Main } from "@/layout";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getUser } from "@/api/user";
import { getToken } from "@/api/token";

import { DIV_PROPERTIES } from "@/properties";
import { WEBSCOKET_URL } from "@/constants";

import { io } from "socket.io-client";
import { findChat } from "@/api/find-chat";

const Page = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatRoom | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const token = await getToken();
      const chat = await findChat(chatId);

      if (!user || !token) {
        return router.push("/register");
      }

      if (!chat) {
        return router.push("/chat");
      }

      setChat(chat);
      setUser(user);
      setToken(token);
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const websocket = io(WEBSCOKET_URL.href, {
    extraHeaders: {
      authorization: `Bearer ${token}`
    }
  });

  useEffect(() => {
    websocket.emit("join", chatId);

    return () => {
      /* websocket.emit("disconnect", chatId); */
    }
  }, []);

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

  if (!chat) {
    return router.push("/chat");
  }

  return (
    <Main itemsCenter>
      <div {...DIV_PROPERTIES.BASE_SECTION}>
        {chat.name}
      </div>
    </Main>
  );
};

export default Page;
