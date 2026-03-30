import { FooterAuthorsList } from "@/components";
import { AUTHORS } from "@/constants";

export const Footer = () => {
  return (
    <footer
      className={["bg-(--bg-section) rounded-t-2xl", "flex p-4"].join(" ")}
    >
      <FooterAuthorsList authors={AUTHORS} />
    </footer>
  );
};
