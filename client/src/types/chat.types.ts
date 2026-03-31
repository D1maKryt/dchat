import type { Message } from "./message.types";

export interface ChatRoom {
  id: string;
  name: string;
  createdAt: Date | null;
  messages: Message[];
}
