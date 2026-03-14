"use server";

import type { RegisterUser, User } from "@/types";
import { endpointRequestOrNull } from "./endpoint-request";

import { cookies } from "next/headers";

export const register = async (user: RegisterUser): Promise<User | null> => {
  const cookie = await cookies();

  const data = await endpointRequestOrNull({
    endpoint: "/auth/register",
    cache: false,
    init: {
      method: "POST",
      body: JSON.stringify(user),
    },
    statusResponse: 201,
  });

  if (!data) {
    return null;
  }

  cookie.set("token", data.user.Token);
  cookie.set("user", JSON.stringify(data.user));

  return data.user;
};
