import { ElementType, SVGProps } from "react";
import { CollapsedNavLink } from "./CollapsedNavLink";
import { ExpandedNavLink } from "./ExpandedNavLink";

type SidebarNavLinkProps = {
  href: string;
  label: string;
  icon: ElementType;
  collapsed?: boolean;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: { label: string; href: string }[];
  initiallyOpened?: boolean;
};

const SidebarNavLink = (props: SidebarNavLinkProps) => {
  return props.collapsed ? <CollapsedNavLink {...props} /> : <ExpandedNavLink {...props} />;
};

export default SidebarNavLink;
