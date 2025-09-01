import { Center, Loader, Stack } from "@mantine/core";
import React from "react";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { useCurrentUser } from "../../features/auth/identity.hooks";
import { useAppStore } from "../../zustand/stores/appStore";
const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppStore((s) => s.accessToken);
  const setUser = useAppStore((s) => s.setUser);

  const { data, isPending, error } = useCurrentUser();

  if (!accessToken) return <>{children}</>;

  if (error) return <Center>Error loading user data</Center>;

  if (isPending)
    return (
      <Center h="100vh">
        <Stack align="center">
          {/* <MantineLogo color="primary" size={50} /> */}
          <BrandLogo iconSize={50} textSize={35} className="gap-4" />
          <Loader size="lg" />
        </Stack>
      </Center>
    );

  if (data) {
    setUser(data);
  }

  return <>{children}</>;
};

export default IdentityProvider;
