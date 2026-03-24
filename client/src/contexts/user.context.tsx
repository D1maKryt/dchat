import type { User } from "@/types";

import { createContext } from "@/utils";

export type UserContextType = User;

export const [UserContext, useUser] = createContext<UserContextType>("UserContext");
