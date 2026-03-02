import { Container, MantineBreakpoint } from "@mantine/core";
import React from "react";
import { cn } from "../../../../utils/cn";

type HomePageSectionWrapperProps = {
  className?: string;
  children: React.ReactNode;
  classNames?: {
    root?: string;
    container?: string;
  };
  size?: MantineBreakpoint;
};

const HomePageBlockWrapper = ({
  className,
  children,
  classNames,
  size = "xl",
}: HomePageSectionWrapperProps) => {
  return (
    <section className={cn("px-2 md:px-4", className, classNames?.root)}>
      <Container size={size} className={cn("py-15", classNames?.container)}>
        {children}
      </Container>
    </section>
  );
};

export default HomePageBlockWrapper;
