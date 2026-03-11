import Link from 'next/link';

export const Header = () => {
  return (
    <header className={[
      "bg-(--bg-section) rounded-2xl",
      "flex justify-between items-center p-4 m-4",
    ].join(" ")}>
      <h3>D Chat</h3>
      <div>
        <Link href="/login" className="px-4 py-2 mr-2 bg-foreground text-component rounded">Войти</Link>
        <Link href="/register" className="px-4 py-2 bg-component text-foreground rounded">Зарегистрироваться</Link>
      </div>
    </header>
  );
};
