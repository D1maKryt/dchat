"use client";

import type { ChatRoom, Message, User } from "@/types";
import type { SubmitEvent } from "react";

import { Button, CircleProgress, Input, useStore } from "tvuikit";
import { Main } from "@/layout";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getMe, getUser } from "@/api/get-user";
import { getToken } from "@/api/token";
import { findChat } from "@/api/find-chat";

import { DIV_PROPERTIES } from "@/properties";
import { WEBSCOKET_URL } from "@/constants";

import { useDateFormatters } from "@/hooks/use-date-formatters";

import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";

const Page = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { formatFullDate, formatTime } = useDateFormatters();

  const { store, items, addItem, getItem } = useStore<
    Message & { frontendId: string }
  >();
  const users = useStore<User>();
  const [token, setToken] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatRoom | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getMe();
      const token = await getToken();
      const chat = await findChat(chatId);

      if (!user || !token) {
        return router.push("/register");
      }

      if (!chat) {
        return router.push("/chat");
      }

      const websocket = io(WEBSCOKET_URL.href, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      });

      websocket.emit("join", chatId);
      websocket.on("msg", async (message: Message) => {
        if (!user) {
          return;
        }

        if (message.authorId === user.id) {
          return;
        }

        const gettedUser = await getUser(message.authorId);
        if (!gettedUser) {
          return;
        }

        if (items.current[message.id]) {
          return;
        }

        users.addItem(gettedUser);
        addItem({ ...message, frontendId: message.id });
      });

      users.addItem(user);
      setSocket(websocket);
      setChat(chat);
      setUser(user);
      setToken(token);
      setLoaded(true);
    })();

    return () => {
      socket?.removeListener("msg");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessageSend = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !chat || !inputRef.current || !socket) {
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
    socket.emit("send", frontendMesssage, (message: Message) => {
      items.current[id] = { ...message, frontendId: id };
    });

    messagesRef.current?.scrollTo({
      behavior: "smooth",
      top: messagesRef.current.scrollHeight,
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

  if (!chat) {
    return router.push("/chat");
  }

  return (
    <Main itemsCenter>
      <div
        className={[
          DIV_PROPERTIES.BASE_SECTION.className,
          "w-full h-full",
        ].join(" ")}
      >
        <h2>{chat.name}</h2>
        <div
          ref={messagesRef}
          className="w-full flex flex-col flex-1 gap-4 justify-start items-start overflow-y-auto"
        >
          {store.map((id) => {
            const message = getItem(id);
            if (!message) {
              return null;
            }

            const date = new Date(message.createdAt);
            const formattedDate = `${formatTime(date)}, ${formatFullDate(date)}`;

            return (
              <div
                key={id}
                className="flex flex-col gap-2 w-fit py-2 px-4 bg-(--bg-smooth) rounded-xl"
              >
                <span>
                  {users.getItem(message.authorId)?.name || "loading..."}
                </span>
                <p>{message.content}</p>
                <span className="text-mini self-end">{formattedDate}</span>
              </div>
            );
          })}
        </div>

        <form className="w-full flex gap-2" onSubmit={handleMessageSend}>
          <Input
            ref={inputRef}
            name="content"
            className="flex-1 max-w-none"
            placeholder="Your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </Main>
  );
};

export default Page;
