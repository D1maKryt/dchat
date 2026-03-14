"use server"

import type { LoginUser } from "@/types";
import { endpointRequestOrNull } from "./endpoint-request";

import { cookies } from "next/headers";

export const login = async (user: LoginUser) => {
  const cookie = await cookies();

  const data = await endpointRequestOrNull({
    endpoint: "/auth/login",
    cache: false,
    init: {
      method: "POST",
      body: JSON.stringify(user),
    },
    statusResponse: 201
  });

  if (!data) {
    return null;
  }

  cookie.set("token", data[1].Token);
  cookie.set("user", JSON.stringify(data[1]));

  return data[1];
}