import { Anchor, Box, Container, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginSessionStorageHelper } from "../../utils/storageHelper";
import { showErrorToast } from "../../utils/toastHelper";
import { useAppStore } from "../../zustand/store";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const currentUser = useAppStore.use.currentUser();
  if (currentUser) return <Navigate to="/" replace={true} />;

  useEffect(() => {
    if (loginSessionStorageHelper.shouldShowSessionExpiredToast()) {
      showErrorToast("Session Expired", "Please log in again to continue.");
      loginSessionStorageHelper.clearSessionExpiredToastFlag();
    }
  }, []);

  return (
    <Box
      className="flex justify-center pt-[100px] min-h-screen bg-linear-to-br from-cyan-200 to-pink-300
        dark:bg-linear-to-r dark:from-gray-900 dark:to-slate-900"
    >
      <Container size={500} flex={1}>
        <Title ta="center" className="font-black font-[Greycliff_CF,var(--mantine-font-family)]">
          Welcome back!
        </Title>
        <Text size="md" ta="center" mt={5} className="text-gray-8 dark:text-dark-1">
          Do not have an account yet?{" "}
          <Anchor size="sm" c="blue" component={Link} to="/register" className="font-semibold">
            Create account
          </Anchor>
        </Text>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
