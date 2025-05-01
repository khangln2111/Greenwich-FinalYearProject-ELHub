import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { ElementType, SVGProps, useState } from "react";
import { Collapse, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

type SidebarNavLinkProps = {
  href: string;
  label: string;
  icon: ElementType;
  collapsed?: boolean;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: { label: string; href: string }[];
  initiallyOpened?: boolean;
};

const SidebarNavLink = ({
  href,
  label,
  icon: Icon,
  collapsed,
  iconProps,
  subLinks,
  initiallyOpened = false,
}: SidebarNavLinkProps) => {
  const location = useLocation();
  const [opened, setOpened] = useState(initiallyOpened);
  const hasSubLinks = Array.isArray(subLinks) && subLinks.length > 0;

  const isSubLinkActive = hasSubLinks
    ? subLinks.some((link) => location.pathname === link.href)
    : false;

  const isActive = location.pathname === href || isSubLinkActive;

  const handleClick = () => {
    if (hasSubLinks) {
      setOpened((prev) => !prev);
    }
  };

  const content = (
    <div
      onClick={handleClick}
      className={cn(
        `flex items-center gap-3 text-sm font-medium rounded-md px-3 py-2 transition-all duration-300 group
        justify-start text-gray-7 dark:text-dark-1 hover:bg-primary-light-hover
        hover:text-primary-light-color data-active:bg-primary-light data-active:text-primary-light-color
        data-active:font-semibold cursor-pointer`,
        {
          "justify-center aspect-square": collapsed,
        },
      )}
      data-active={isActive || undefined}
    >
      <Icon
        {...iconProps}
        className={cn(
          `size-[25px] shrink-0 text-gray-6 dark:text-dark-2 group-hover:text-primary-light-color
          group-data-active:text-primary-light-color stroke-[1.5]`,
          iconProps?.className,
        )}
      />
      {!collapsed && (
        <p className="origin-left starting:opacity-0 starting:-translate-x-full transition-all">
          {label}
        </p>
      )}
      {hasSubLinks && (
        <IconChevronRight
          className={cn("transition-transform duration-200 ease ml-auto", {
            "rotate-90": opened,
          })}
          stroke={1.5}
          size={16}
        />
      )}
    </div>
  );

  return (
    <div>
      {hasSubLinks ? (
        content // plain div, not Link
      ) : (
        <Link to={href} className="no-underline">
          {content}
        </Link>
      )}

      {hasSubLinks && (
        <Collapse in={opened} className="mt-2">
          {(subLinks ?? []).map((link) => {
            const isCurrent = location.pathname === link.href;
            return (
              <Text
                component={Link}
                to={link.href}
                key={link.label}
                className={cn(
                  `font-medium block no-underline px-md py-xs pl-md ml-xl text-sm border-l border-l-gray-3
                  dark:border-l-dark-4 hover:text-primary`,
                  isCurrent ? "text-primary font-semibold" : "text-gray-7 dark:text-dark-0",
                )}
              >
                {link.label}
              </Text>
            );
          })}
        </Collapse>
      )}
    </div>
  );
};

export default SidebarNavLink;
