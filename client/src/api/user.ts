"use server";

import type { User } from "@/types";

import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async (): Promise<User | null> => {
  const cookie = await cookies();

  const data = cookie.get("user");
  if (!data) {
    return null;
  }

  return JSON.parse(data.value);
});
