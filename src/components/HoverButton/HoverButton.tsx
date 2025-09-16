import { forwardRef } from "react";
import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface HoverButtonProps extends ButtonProps {
  children: ReactNode;
  textClass?: string;
  overlayClass?: string;
  icon?: LucideIcon;
  iconClass?: string;
}

const _HoverButton = forwardRef<HTMLButtonElement, HoverButtonProps>(
  (
    {
      children,
      textClass = "text-primary-6 dark:text-white",
      overlayClass = "bg-primary-5 dark:bg-primary-3",
      icon: Icon = null,
      iconClass = "text-white w-6 h-6",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant="default"
        radius="full"
        size="md"
        className={cn(
          `relative overflow-hidden inline-flex items-center justify-center group p-4 px-6 py-3 font-medium
          border-2 border-primary-5 dark:border-primary-2 shadow-md transition duration-300 ease-out
          rounded-full dark:bg-slate-700`,
          className,
        )}
        {...props}
      >
        {/* Overlay + icon */}
        {Icon && (
          <span
            className={cn(
              `absolute inset-0 flex items-center justify-center transform -translate-x-full transition-transform
              duration-300 ease group-hover:translate-x-0`,
              overlayClass,
            )}
          >
            <Icon className={iconClass} />
          </span>
        )}

        {/* Text */}
        <span
          className={cn(
            `absolute inset-0 flex items-center justify-center transition-transform duration-300 ease
            group-hover:translate-x-full`,
            textClass,
          )}
        >
          {children}
        </span>

        {/* Invisible text để giữ layout */}
        <span className="relative invisible">{children}</span>
      </Button>
    );
  },
);

const HoverButton = createPolymorphicComponent<"button", HoverButtonProps>(_HoverButton);

export default HoverButton;
