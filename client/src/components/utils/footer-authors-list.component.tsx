import type { Authors, DivProperties, SocialLink, SocialLinks } from "@/types";
import type { ReactNode } from "react";

import { FOOTER_AUTHORS_LIST_PROPERTIES } from "@/properties";

import Link from "next/link";

export type FooterAuthorLinksListItemProperties = {
  link: SocialLink,
  className?: string;
};

export const FooterAuthorLinksListItem = ({ link, ...properties }: FooterAuthorLinksListItemProperties): ReactNode => {
  return (
    <Link href={link.href} {...FOOTER_AUTHORS_LIST_PROPERTIES.AUTHOR_LINKS_ITEM} {...properties}>
      <link.Icon size={16} />
    </Link>
  );
}

export type FooterAuthorLinksListProperties = {
  links: SocialLinks;
} & Omit<DivProperties, "children">;

export const FooterAuthorLinksList = ({ links, ...properties }: FooterAuthorLinksListProperties): ReactNode => {
  return (
    <div {...FOOTER_AUTHORS_LIST_PROPERTIES.AUTHOR_LINKS} {...properties}>
      {links.map(link => (
        <FooterAuthorLinksListItem
          key={link.name}
          link={link}
        />
      ))}
    </div>
  )
}

export type FooterAuthorsListProperties = {
  authors: Authors;
} & Omit<DivProperties, "children">;

const convertAuthorsToReactNode = (authors: Authors): ReactNode => {
  return Object.keys(authors).map(author => {
    const links = authors[author];
    
    return (
      <div key={author} {...FOOTER_AUTHORS_LIST_PROPERTIES.AUTHOR_LINKS_PARENT}>
        <span>© {author}</span>
        <FooterAuthorLinksList
          links={links}
        />
      </div>
    );
  });
}

export const FooterAuthorsList = ({ authors, ...properties }: FooterAuthorsListProperties) => {
  const list = convertAuthorsToReactNode(authors);

  return (
    <div {...FOOTER_AUTHORS_LIST_PROPERTIES.LIST} {...properties}>
      {list}
    </div>
  )
}