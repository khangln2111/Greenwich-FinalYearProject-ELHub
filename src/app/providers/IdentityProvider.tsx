import { Center, Loader, Stack } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import React from "react";
import { useCurrentUser } from "../../features/auth/identityHooks";
import { useAppStore } from "../../zustand/stores/appStore";
import LogoIcon from "../../assets/brandIcon.svg";
const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppStore((s) => s.accessToken);
  const setUser = useAppStore((s) => s.setUser);

  const { data, isPending } = useCurrentUser();

  if (data) {
    setUser(data);
  }

  if (!accessToken) return <>{children}</>;

  if (isPending)
    return (
      <Center h="100vh">
        <Stack align="center">
          {/* <MantineLogo color="primary" size={50} /> */}
          <div className="flex items-center gap-4">
            <img src={LogoIcon} alt="Logo" className="size-[50px]" />
            <span
              className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400
                dark:from-blue-400 dark:via-sky-300 dark:to-cyan-200 bg-clip-text text-transparent
                [text-shadow:0_0_2px_rgba(0,0,0,0.15)] text-[35px]"
            >
              ELHub
            </span>
          </div>
          <Loader size="lg" color="blue" />
        </Stack>
      </Center>
    );

  return <>{children}</>;
};

export default IdentityProvider;
