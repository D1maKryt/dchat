"use client";

import type { ChatRoom, Message, User } from "@/types";
import type { SubmitEvent } from "react";

import { Button, CircleProgress, Input, useStore } from "tvuikit";
import { Main } from "@/layout";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getUser } from "@/api/user";
import { getToken } from "@/api/token";
import { findChat } from "@/api/find-chat";

import { DIV_PROPERTIES } from "@/properties";
import { WEBSCOKET_URL } from "@/constants";

import { useDateFormatters } from "@/hooks/use-date-formatters";

import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

const Page = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { formatFullDate, formatTime } = useDateFormatters();
  
  const {
    store,
    items,
    addItem,
    getItem,
    remoteItem: removeItem
  } = useStore<Message & { frontendId: string }>();
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

  const handleMessageSend = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !chat || !inputRef.current) { 
      return null;
    }

    const { content } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    if (!content) {
      return;
    }

    const messageContent = content.toString().trim();
    if (!messageContent) {
      return null;
    }

    const id = uuid();
    const frontendMesssage = {
      id,
      frontendId: id,
      authorId: user.id,
      authorID: user.id,
      content: messageContent,
      massage: messageContent,
      createdAt: new Date(),
      roomId: chat.id,
      roomID: chat.id,
    };

    inputRef.current.value = "";

    addItem(frontendMesssage);
    websocket.emit("send", frontendMesssage, (message: Message) => {
      items.current[id] = { ...message, frontendId: id };
    });
  }

  useEffect(() => {
    websocket.emit("join", chatId);
    websocket.on("msg", (message) => {
      console.log({ message });
    });

    return () => {
      /* websocket.emit("disconnect", chatId); */
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div
        className={[
          DIV_PROPERTIES.BASE_SECTION.className,
          "w-full h-full"
        ].join(" ")}
      >
        <h2>{chat.name}</h2>
        <div className="w-full flex flex-col flex-1 gap-4 justify-start items-start">
          {store.map(id => {
            const message = getItem(id);
            if (!message) {
              return null;
            };

            const date = new Date(message.createdAt);
            const formattedDate = `${formatTime(date)}, ${formatFullDate(date)}`;

            return (
              <div key={id} className="flex flex-col gap-2 w-fit py-2 px-4 bg-(--bg-smooth) rounded-xl">
                <span>{message.authorId}</span>
                <p>{message.content}</p>
                <span className="text-mini self-end">{formattedDate}</span>
              </div>
            );
          })}
        </div>

        <form className="w-full flex gap-2" onSubmit={handleMessageSend}>
          <Input ref={inputRef} name="content" className="flex-1 max-w-none" placeholder="Your message..." />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </Main>
  );
};

export default Page;
