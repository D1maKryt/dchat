import type { Authors } from "@/types";

import { Authors as AuthorsEnum, Services } from "@/enums";
import { FooterAuthorLinksList } from "@/components";

import { FaGithub, FaGlobe } from "react-icons/fa";

export const AUTHORS: Authors = {
  [AuthorsEnum.Dima]: [
    {
      name: Services.Github,
      href: "https://github.com/D1maKryt",
      Icon: FaGithub,
    },
  ],

  [AuthorsEnum.FOCKUSTY]: [
    {
      href: "https://github.com/FOCKUSTY",
      name: Services.Github,
      Icon: FaGithub,
    },
    {
      name: Services.Globe,
      href: "https://fockusty.vercel.app",
      Icon: FaGlobe,
    },
  ],
};

export const AuthorsFooterList = Object.keys(AUTHORS).map((author) => {
  const links = AUTHORS[author];
  const list = <FooterAuthorLinksList links={links} />;
  return [author, list] as const;
});
