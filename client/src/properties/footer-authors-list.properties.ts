import type { FooterAuthorLinksListItemProperties } from "@/components";
import type { DivProperties } from "@/types";

type FooterAuthorsListDivPropertiesKeys =
  | "AUTHOR_LINKS_PARENT"
  | "AUTHOR_LINKS"
  | "LIST";

type FooterAuthorsListUniqueProperties = {
  AUTHOR_LINKS_ITEM: Omit<FooterAuthorLinksListItemProperties, "link">;
};

type FooterAuthorsListDivProperties = Record<
  FooterAuthorsListDivPropertiesKeys,
  DivProperties
>;
type FooterAuthorsListAllProperties = FooterAuthorsListDivProperties &
  FooterAuthorsListUniqueProperties;

export const FOOTER_AUTHORS_LIST_PROPERTIES: FooterAuthorsListAllProperties = {
  LIST: {
    className: "flex flex-col gap-1",
  },
  AUTHOR_LINKS_PARENT: {
    className: "flex flex-row gap-2 items-center",
  },
  AUTHOR_LINKS: {
    className: "flex flex-row gap-2 items-center",
  },
  AUTHOR_LINKS_ITEM: {},
};
