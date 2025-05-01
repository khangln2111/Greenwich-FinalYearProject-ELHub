import { Link, useLocation } from "react-router-dom";
import { Collapse } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState, ElementType, SVGProps } from "react";
import { SubLinkList } from "./SubLinkList";
import { cn } from "../../../../utils/cn";

type Props = {
  href: string;
  label: string;
  icon: ElementType;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: { label: string; href: string }[];
  initiallyOpened?: boolean;
};

export const ExpandedNavLink = ({
  href,
  label,
  icon: Icon,
  iconProps,
  subLinks,
  initiallyOpened,
}: Props) => {
  const location = useLocation();
  const isSubLinkActive = subLinks?.some((l) => location.pathname === l.href) ?? false;
  const isActive = location.pathname === href || isSubLinkActive;

  const [opened, setOpened] = useState(() => initiallyOpened || isSubLinkActive);
  const hasSubLinks = subLinks && subLinks.length > 0;

  const content = (
    <div
      onClick={() => hasSubLinks && setOpened((prev) => !prev)}
      className={cn(
        `flex items-center gap-3 text-sm font-medium rounded-md px-3 py-2 transition-all duration-300 group
        justify-start text-gray-7 dark:text-dark-1 hover:bg-primary-light-hover
        hover:text-primary-light-color data-active:bg-primary-light data-active:text-primary-light-color
        data-active:font-semibold cursor-pointer`,
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
      <p>{label}</p>
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
        content
      ) : (
        <Link to={href} className="no-underline">
          {content}
        </Link>
      )}
      {hasSubLinks && (
        <Collapse in={opened} className="mt-2">
          <SubLinkList subLinks={subLinks} />
        </Collapse>
      )}
    </div>
  );
};
