import { ElementType, SVGProps } from "react";
import { useLocation } from "react-router-dom";
import { CollapsedNavLink } from "./CollapsedNavLink";
import { ExpandedNavLink } from "./ExpandedNavLink";

type SubLink = { label: string; href: string };

type SidebarNavLinkProps = {
  href: string;
  label: string;
  icon: ElementType;
  collapsedToIcon?: boolean;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: SubLink[];
  initiallyOpened?: boolean;
};

const SidebarNavLink = ({
  href,
  label,
  icon,
  collapsedToIcon,
  iconProps,
  subLinks,
  initiallyOpened,
}: SidebarNavLinkProps) => {
  const location = useLocation();
  const hasSubLinks = Array.isArray(subLinks) && subLinks.length > 0;
  const isSubLinkActive = hasSubLinks && subLinks!.some((link) => location.pathname === link.href);
  const isActive = location.pathname === href || isSubLinkActive;

  const sharedProps = {
    href,
    label,
    icon,
    iconProps,
    subLinks,
    hasSubLinks,
    isActive,
    isSubLinkActive,
    initiallyOpened,
  };

  return collapsedToIcon ? (
    <CollapsedNavLink {...sharedProps} />
  ) : (
    <ExpandedNavLink {...sharedProps} />
  );
};

export default SidebarNavLink;
