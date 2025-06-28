import { Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";

type Props = {
  subLinks: { label: string; href: string }[];
};

export const SubLinkList = ({ subLinks }: Props) => {
  const location = useLocation();

  return (
    <>
      {subLinks.map((link) => {
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
    </>
  );
};
