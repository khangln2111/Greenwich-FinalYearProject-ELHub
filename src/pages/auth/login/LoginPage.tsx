import { Anchor, Box, Container, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginSessionStorageHelper } from "../../../utils/storageHelper";
import { showErrorToast } from "../../../utils/toastHelper";
import { useAppStore } from "../../../zustand/store";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const currentUser = useAppStore.use.currentUser();

  useEffect(() => {
    if (loginSessionStorageHelper.shouldShowSessionExpiredToast()) {
      showErrorToast("Session Expired", "Please log in again to continue.");
      loginSessionStorageHelper.clearSessionExpiredToastFlag();
    }
  }, []);

  if (currentUser) return <Navigate to="/" replace={true} />;

  return (
    <Box
      className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-cyan-200 to-pink-300
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      <Container size={500} flex={1}>
        <Title ta="center" className="font-black">
          Welcome back!
        </Title>
        <Text size="lg" ta="center" mt={5} className="text-gray-8 dark:text-dark-1">
          Do not have an account yet?{" "}
          <Anchor size="lg" component={Link} to="/register" className="font-semibold">
            Create account
          </Anchor>
        </Text>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
