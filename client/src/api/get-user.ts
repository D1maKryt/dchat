"use server";

import type { User } from "@/types";

import { cookies } from "next/headers";
import { cache } from "react";
import { endpointRequestOrNull } from "./endpoint-request";

export const getMe = cache(async (): Promise<User | null> => {
  const cookie = await cookies();

  const data = cookie.get("user");
  if (!data) {
    return null;
  }

  return JSON.parse(data.value);
});

export const getUser = cache(async (id: string): Promise<User | null> => {
  const data = await endpointRequestOrNull({
    endpoint: `/admin-panel/findUser/${id}`,
    init: {
      method: "GET",
    },
  });

  if (!data) {
    return null;
  }

  return data as User;
});
