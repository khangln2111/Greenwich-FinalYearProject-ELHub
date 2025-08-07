import { Center, Loader, Stack } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import React from "react";
import { useCurrentUser } from "../../features/auth/identityHooks";
import { useAppStore } from "../../zustand/store";

const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppStore.use.accessToken();
  const setUser = useAppStore.use.setUser();

  const { data, isPending } = useCurrentUser();

  if (data) {
    setUser(data);
  }

  if (!accessToken) return <>{children}</>;

  if (isPending)
    return (
      <Center h="100vh">
        <Stack align="center">
          <MantineLogo color="primary" size={50} />
          <Loader size="lg" color="blue" />
        </Stack>
      </Center>
    );

  return <>{children}</>;
};

export default IdentityProvider;
