"use server";

import type { TwoFaData } from "@/types";
import { endpointRequestOrNull } from "./endpoint-request";

export const getTwoFa = async (username: string): Promise<TwoFaData | null> => {
  const data = await endpointRequestOrNull({
    endpoint: "/TwoFactorAuth/2faTurnOn",
    cache: false,
    init: {
      method: "POST",
      body: JSON.stringify({ username }),
    },
    statusResponse: 201,
  });

  if (!data) {
    return null;
  }

  return data;
};

export const confirmTwoFa = async (username: string, code: string) => {
  const data = await endpointRequestOrNull({
    endpoint: "/TwoFactorAuth/2faConfirm",
    cache: false,
    init: {
      method: "POST",
      body: JSON.stringify({ username, code }),
    },
    statusResponse: 201,
  });

  if (!data) {
    return null;
  }

  return data;
};
