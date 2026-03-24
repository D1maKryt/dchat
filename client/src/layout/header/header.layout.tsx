"use client";

import type { User } from "@/types";

import { UserHeader } from "./user-header.layout";
import { RegisterHeader } from "./register-header.layout";

export type HeaderProperties = {
  user?: User | null;
}

export const Header = ({
  user = null
}: HeaderProperties) => {
  return (
    <header
      className={[
        "bg-(--bg-section) rounded-2xl",
        "flex justify-between items-center p-4 m-4",
      ].join(" ")}
    >
      <h3>D Chat</h3>
      <div className="flex gap-4">
        {
          user
            ? <UserHeader user={user} />
            : <RegisterHeader />
        }
      </div>
    </header>
  );
};
