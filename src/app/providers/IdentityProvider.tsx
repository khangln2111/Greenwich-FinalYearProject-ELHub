import { Center, Loader, Stack } from "@mantine/core";
import React from "react";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { useCurrentUser } from "../../features/auth/identityHooks";
import { useAppStore } from "../../zustand/stores/appStore";
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
          <BrandLogo iconSize={50} textSize={35} className="gap-4" />
          <Loader size="lg" color="blue" />
        </Stack>
      </Center>
    );

  return <>{children}</>;
};

export default IdentityProvider;
