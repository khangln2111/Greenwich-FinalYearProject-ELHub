import { forwardRef } from "react";
import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface HoverButtonV2Props extends ButtonProps {
  children: ReactNode;
  textClass?: string;
  overlayClass?: string;
  icon?: LucideIcon;
  iconClass?: string;
  contentClass?: string;
  borderGradientClass?: string; // mới
}

const _HoverButton = forwardRef<HTMLButtonElement, HoverButtonV2Props>(
  (
    {
      children,
      overlayClass,
      icon: Icon = null,
      textClass = "text-primary-6 dark:text-white",
      iconClass = "text-white w-6 h-6",
      contentClass,
      borderGradientClass = "from-pink-500 via-purple-500 to-indigo-500",
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
          `relative overflow-hidden inline-flex items-center justify-center group p-0 rounded-full border-none
          bg-transparent`,
          className,
        )}
        {...props}
      >
        {/* Gradient border div */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r p-[2.5px]",
            borderGradientClass,
          )}
        >
          {/* button content */}
          <div
            className={cn(
              `relative z-10 flex items-center justify-center w-full h-full rounded-full bg-white dark:bg-slate-700
              p-4 px-6 py-3 font-medium shadow-md`,
              contentClass,
            )}
          >
            {/* Overlay + icon */}
            {Icon && (
              <span
                className={cn(
                  `absolute inset-0 flex items-center justify-center transform -translate-x-full transition-transform
                  duration-300 ease group-hover:translate-x-0 group-hover:bg-gradient-to-r ${borderGradientClass}`,
                  overlayClass,
                )}
              >
                <Icon className={cn(iconClass)} />
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

            {/* Invisible text to maintain layout */}
            <span className="relative invisible">{children}</span>
          </div>
        </div>
      </Button>
    );
  },
);

const HoverButtonV2 = createPolymorphicComponent<"button", HoverButtonV2Props>(_HoverButton);

export default HoverButtonV2;
