import type { UsersOnRoles } from "./user.types";

export interface Role {
  id: string;
  name: string;
  createdAt: Date;
  users: UsersOnRoles[];
}
