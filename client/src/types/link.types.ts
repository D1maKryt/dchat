import type { IconType } from "react-icons";

export type SocialLink = {
  Icon: IconType;
  name: string;
  href: string;
};

export type SocialLinks = SocialLink[];

export type Authors = {
  [author: string]: SocialLinks;
};
