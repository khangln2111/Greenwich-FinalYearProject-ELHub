import React from "react";
import { useCurrentUser } from "../../react-query/auth/identityHooks";
import { useAppStore } from "../../zustand/store";
import { Center, Loader, Stack } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppStore.use.accessToken();
  const refreshToken = useAppStore.use.refreshToken();
  if (!accessToken || !refreshToken) return <>{children}</>;
  const setUser = useAppStore.use.setUser();
  const { data, isPending } = useCurrentUser();

  if (isPending)
    return (
      <Center h="100vh">
        <Stack align="center">
          {/* Logo tùy chỉnh ở đây, có thể là SVG hoặc Text */}
          <MantineLogo color="primary" size={50} />
          <Loader size="lg" color="blue" />
        </Stack>
      </Center>
    );

  if (data) {
    console.log("User data:", data);
    setUser(data);
  }

  return <>{children}</>;
};
export default IdentityProvider;
