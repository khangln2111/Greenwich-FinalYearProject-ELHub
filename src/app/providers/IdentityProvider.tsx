import React, { useEffect } from "react";
import { useCurrentUser } from "../../react-query/auth/identityHooks";
import { useAppStore } from "../../zustand/store";
import { Center, Loader, Stack } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppStore.use.accessToken();
  const refreshToken = useAppStore.use.refreshToken();
  const setUser = useAppStore.use.setUser();

  const { data, isPending } = useCurrentUser();

  if (data) {
    console.log("User set:", data);
    setUser(data);
  }

  if (!accessToken || !refreshToken) return <>{children}</>;

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
