"use client"

import { Button } from "@mui/material";

export const Header = () => {
  return (
    <header
      className={[
        "bg-(--bg-section) rounded-2xl",
        "flex justify-between items-center p-4 m-4",
      ].join(" ")}
    >
      <h3>D Chat</h3>
      <div className="flex gap-4">
        <Button variant="contained" href="/login" color="primary">
          Войти
        </Button>

        <Button variant="contained" href="/register" color="primary">
          Зарегистрироваться
        </Button>
      </div>
    </header>
  );
};
