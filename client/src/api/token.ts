"use server";

import { cookies } from "next/headers";
import { cache } from "react";

export const getToken = cache(async () => {
  const cookie = await cookies();

  const token = cookie.get("token");
  if (!token) {
    return null;
  }

  return token.value;
});

export const setToken = async (token: string) => {
  const cookie = await cookies();
  return cookie.set("token", token);
};
