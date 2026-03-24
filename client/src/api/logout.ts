"use server"

import { refresh } from "next/cache";
import { cookies } from "next/headers"

export const logout = async () => {
  const cookie = await cookies();

  cookie.delete("token");
  cookie.delete("user");

  refresh();

  return true;
}