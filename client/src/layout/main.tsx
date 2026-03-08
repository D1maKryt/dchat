import type { DetailedHTMLProps, HTMLAttributes } from "react";

type Properties = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Main = ({
  children,
  className,
  ...properties
}: Properties) => {
  return (
    <main className={[
      "mx-4 h-full flex-1",
      className,
    ].join(" ")} {...properties}>
      {children}
    </main>
  )
}
