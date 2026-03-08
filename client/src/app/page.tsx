import Link from "next/link";

import { Main } from "@/layout";

const HomePage = () => {
  return (
    <Main className="flex flex-col items-center justify-center">
      <div className={[
        "flex flex-col h-fit w-fit items-center",
        "p-4 gap-2 rounded-2xl",
        "bg-(--bg-section)"
      ].join(" ")}>
        <h4>Добро пожаловать в DChat</h4>
        <p className="max-w-100">
          Это удобный и защищённый анонимный чат для хорошего общения.
        </p>
        <p className="max-w-100">
          Вы можете{" "}
          <Link href={"/anonymus"}>продолжить анонимно</Link>{" "}
          или{" "}
          <Link href={"/register"}>зарегистрироваться</Link>
          , чтобы пользоваться им ещё более удобно, с возможностью сохранения информации.
        </p>
        <p className="text-mini max-w-100">
          (анонимное использование сервиса не даёт возможность сохранять информацию, такие как: чаты, настройки, сообщения и другие)
        </p>
      </div>
    </Main>
  );
}

export default HomePage;
