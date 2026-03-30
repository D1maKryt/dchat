"use server"

import type { ChatRoom } from "@/types";

import { cache } from "react";
import { endpointRequestOrNull } from "./endpoint-request";

export const findChat = cache(async (id: string): Promise<ChatRoom|null> => {
  const data = await endpointRequestOrNull({
    endpoint: `/admin-panel/findRoom/${id}`,
    init: {
      method: "GET"
    },
  });

  if (!data) {
    return null;
  }

  return data;
});
