import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeToggler = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun
        className="size-[22px] hidden dark:block text-yellow-3"
        stroke={1.5}
      />
      <IconMoon
        className="size-[22px] block dark:hidden fill-blue-3"
        stroke={1.5}
      />
    </ActionIcon>
  );
};

export default ThemeToggler;
