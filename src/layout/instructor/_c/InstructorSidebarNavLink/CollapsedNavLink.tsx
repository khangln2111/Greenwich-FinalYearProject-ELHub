import { Link, useLocation } from "react-router-dom";
import { Menu, Tooltip } from "@mantine/core";
import { ElementType, SVGProps } from "react";
import { cn } from "../../../../utils/cn";

type CollapsedNavLinkProps = {
  href: string;
  label: string;
  icon: ElementType;
  iconProps?: SVGProps<SVGSVGElement>;
  subLinks?: { label: string; href: string }[];
};

export const CollapsedNavLink = ({
  href,
  label,
  icon: Icon,
  iconProps,
  subLinks,
}: CollapsedNavLinkProps) => {
  const location = useLocation();
  const isActive =
    location.pathname === href || subLinks?.some((l) => location.pathname === l.href);

  const icon = (
    <div
      className="flex items-center justify-center aspect-square rounded-md cursor-pointer transition-all
        hover:bg-primary-light-hover group data-active:bg-primary-light"
      data-active={isActive || undefined}
    >
      <Icon
        {...iconProps}
        className={cn(
          `size-[25px] text-gray-6 dark:text-dark-2 group-hover:text-primary-light-color
          group-data-active:text-primary-light-color stroke-[1.5]`,
          iconProps?.className,
        )}
      />
    </div>
  );

  if (subLinks && subLinks.length > 0) {
    return (
      <Menu
        position="right-start"
        trigger="click-hover"
        offset={5}
        transitionProps={{ transition: "pop-top-left", duration: 150 }}
      >
        <Menu.Target>{icon}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{label}</Menu.Label>
          {subLinks.map((link) => (
            <Menu.Item
              key={link.label}
              component={Link}
              to={link.href}
              className={cn({
                "font-semibold text-primary": location.pathname === link.href,
              })}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Tooltip label={label} position="right" offset={8}>
      <Link to={href} className="no-underline block">
        {icon}
      </Link>
    </Tooltip>
  );
};
