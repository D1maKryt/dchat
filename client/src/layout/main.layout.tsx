import type { DetailedHTMLProps, HTMLAttributes } from "react";

type Properties = {
  itemsCenter?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const CENTER_ITEMS = "flex flex-col items-center justify-center";

export const Main = ({
  children,
  className,
  itemsCenter: centringItems = false,
  ...properties
}: Properties) => {
  return (
    <main
      className={[
        "mx-4 h-full flex-1",
        centringItems && CENTER_ITEMS,
        className
      ].filter(Boolean).join(" ")}
      {...properties}
    >
      {children}
    </main>
  );
};
