"use client"

import type { User } from "@/types";

import { useState } from "react";
import { logout } from "@/api/logout";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, CircleProgress, Modal, Active } from "tvuikit";

export type UserHeaderProperties = {
  user: User;
};

export const UserHeader = ({ user }: UserHeaderProperties) => {
  const [logoutClicked, setLogoutClicked] = useState<boolean>(false);

  const handleLogout = async () => {
    setLogoutClicked(true);
    
    await logout();

    setLogoutClicked(false);
    window.location.reload();
  }

  return (
    <>
      <Dropdown menuAlign="right" defaultHorizontalPosition="left">
        <DropdownTrigger>
          <span>{user.name}</span>
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem onClick={handleLogout}>
            Выйти с аккаунта
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Active actived={logoutClicked}>
        <Modal
          container={document.body}
          onModalElementClick={() => {}}
          className="flex items-center justify-center bg-(--bg-smooth-ce)"
        >
          <CircleProgress />
        </Modal>
      </Active>
    </>
  )
}