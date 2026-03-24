"use server";

import type { RegisterUser, User } from "@/types";
import { endpointRequest } from "./endpoint-request";

import { cookies } from "next/headers";

const resolveError = (message: string) => {
  if (message === "User уже создан") {
    return "Не удалось зарегистрироваться, пользователь с таким именем уже существует.";
  }

  return null;
}

export const register = async (user: RegisterUser): Promise<User | string | null> => {
  const cookie = await cookies();

  const { data, message } = await endpointRequest({
    endpoint: "/auth/register",
    cache: false,
    init: {
      method: "POST",
      body: JSON.stringify(user),
    },
    statusResponse: 201,
  });

  if (!data) {
    return resolveError(message);
  }

  cookie.set("token", data.Token);
  cookie.set("user", JSON.stringify(data));

  return data;
};
