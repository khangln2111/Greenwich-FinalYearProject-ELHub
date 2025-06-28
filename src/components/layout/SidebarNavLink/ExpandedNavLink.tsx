import { Collapse, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { ElementType, SVGProps, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";

type ExpandedNavLinkProps = {
  href: string;
  label: string;
  icon: ElementType;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: { label: string; href: string }[];
  hasSubLinks: boolean;
  isActive: boolean;
  isSubLinkActive: boolean;
  initiallyOpened?: boolean;
};

export const ExpandedNavLink = ({
  href,
  label,
  icon: Icon,
  iconProps,
  subLinks,
  hasSubLinks,
  isActive,
  isSubLinkActive,
  initiallyOpened = false,
}: ExpandedNavLinkProps) => {
  const [opened, setOpened] = useState(() => initiallyOpened || isSubLinkActive);

  const handleClick = () => {
    if (hasSubLinks) {
      setOpened((prev) => !prev);
    }
  };

  const content = (
    <div
      onClick={handleClick}
      className={cn(
        `flex items-center gap-3 text-sm font-medium rounded-md px-3 py-2 transition-all duration-500
        ease-in-out starting:opacity-0 starting:-translate-x-full group justify-start text-gray-7
        dark:text-dark-1 hover:bg-primary-light-hover hover:text-primary-light-color
        data-active:bg-primary-light data-active:text-primary-light-color data-active:font-semibold
        cursor-pointer`,
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
      <p className="origin-left">{label}</p>
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
        <Collapse in={opened}>
          <div className="pt-2">
            {subLinks?.map((link) => {
              const isCurrent = location.pathname === link.href;
              return (
                <Text
                  component={Link}
                  to={link.href}
                  key={link.label}
                  className={cn(
                    `font-medium block no-underline px-md py-xs pl-md ml-xl text-sm border-l border-l-gray-3
                    dark:border-l-dark-4 hover:text-primary transition-all duration-500 ease-in-out starting:opacity-0
                    starting:-translate-x-full`,
                    isCurrent ? "text-primary font-semibold" : "text-gray-7 dark:text-dark-0",
                  )}
                >
                  {link.label}
                </Text>
              );
            })}
          </div>
        </Collapse>
      )}
    </div>
  );
};
