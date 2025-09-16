import { Container } from "@mantine/core";
import React from "react";
import { cn } from "../../../../utils/cn";

type HomePageSectionWrapperProps = {
  className?: string;
  children: React.ReactNode;
  classNames?: {
    root?: string;
    container?: string;
  };
};

export default function HomePageSectionWrapper({
  className,
  children,
  classNames,
}: HomePageSectionWrapperProps) {
  return (
    <section className={cn("px-2 md:px-4", className, classNames?.root)}>
      <Container size="lg" className={cn("py-12", classNames?.container)}>
        {children}
      </Container>
    </section>
  );
}
