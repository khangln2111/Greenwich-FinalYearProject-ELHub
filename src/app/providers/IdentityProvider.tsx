import { Center, Loader, Stack } from "@mantine/core";
import React from "react";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { useGetCurrentUser } from "../../features/auth/identity.hooks";
import { useAuthStore } from "../../zustand/stores/authStore";
const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setCurrentUser);

  const { data, isPending, error } = useGetCurrentUser();

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
