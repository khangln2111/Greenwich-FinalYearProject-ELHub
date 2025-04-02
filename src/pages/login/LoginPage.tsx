import { Anchor, Box, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Box
      className="flex justify-center pt-[100px] min-h-screen bg-linear-to-br from-cyan-200 to-pink-300
        dark:bg-linear-to-r dark:from-gray-900 dark:to-slate-900"
    >
      <Container size={500} flex={1}>
        <Title ta="center" className="font-black font-[Greycliff_CF,var(--mantine-font-family)]">
          Welcome back!
        </Title>
        <Text c="dimmed" size="md" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" c="blue" component={Link} to="/register">
            Create account
          </Anchor>
        </Text>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
