import { rem } from "@mantine/core";
import LogoIcon from "../../assets/brandIcon/BrandIcon7.svg";
import { cn } from "../../utils/cn";

interface BrandLogoProps {
  variant?: "full" | "mark";
  iconSize?: number;
  textSize?: number;
  textVariant?: "gradient" | "solid";
  className?: string;
  classNames?: {
    text?: string;
    icon?: string;
  };
}

const BrandLogo = ({
  variant = "full",
  iconSize = 35,
  textSize = 24,
  textVariant = "solid",
  className,
  classNames,
}: BrandLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={LogoIcon}
        alt="Logo"
        className={cn("size-[35px] rounded-full", classNames?.icon)}
        style={{
          width: rem(iconSize),
          height: rem(iconSize),
        }}
      />
      {variant === "full" && (
        <span
          style={{
            fontSize: rem(textSize),
          }}
          className={cn(
            "font-semibold tracking-wide font-[Inter] text-2xl",
            {
              "text-black dark:text-white": textVariant === "solid",
              [`bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 dark:from-blue-400 dark:via-sky-300
              dark:to-cyan-200 bg-clip-text text-transparent [text-shadow:0_0_2px_rgba(0,0,0,0.15)]`]:
                textVariant === "gradient",
            },
            classNames?.text,
          )}
        >
          ELHub
        </span>
      )}
    </div>
  );
};
export default BrandLogo;
