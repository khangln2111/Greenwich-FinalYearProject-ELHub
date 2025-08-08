import { forwardRef } from "react";
import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";

type CustomNavLinkProps = BoxProps & {
  className?: string;
  to?: string;
  children?: React.ReactNode;
};

// CustomNavLink styled with tailwind
const _CustomNavLink = forwardRef<HTMLAnchorElement, CustomNavLinkProps>(
  ({ className, children, ...props }, ref) => {
    const baseClass =
      "flex items-center w-full md:w-auto h-[42px] md:h-full px-md no-underline text-black dark:text-white font-semibold text-md hover:bg-gray-50 dark:hover:bg-dark-7 cursor-pointer";

    return (
      <Box component="a" ref={ref} {...props} className={`${baseClass} ${className || ""}`.trim()}>
        {children}
      </Box>
    );
  },
);

const CustomNavLink = createPolymorphicComponent<"a", CustomNavLinkProps>(_CustomNavLink);

export default CustomNavLink;
