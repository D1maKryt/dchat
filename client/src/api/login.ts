"use server";

import type { LoginUser, User } from "@/types";
import { endpointRequest } from "./endpoint-request";

import { cookies } from "next/headers";

const resolveError = (message: string): string|null => {
  return null;
}

export const login = async (user: LoginUser): Promise<User | null | string> => {
  const cookie = await cookies();

  const { data, message } = await endpointRequest({
    endpoint: "/auth/login",
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
