import { Anchor, Box, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <Box
      className="flex items-center justify-center min-h-dvh bgi-auth-light dark:bgi-auth-dark bg-cover bg-center
        bg-no-repeat"
    >
      <Container size={500} flex={1}>
        <Title ta="center" className="font-black">
          Welcome to ELearning Hub
        </Title>
        <Text size="lg" ta="center" mt={5} className="text-gray-8 dark:text-dark-1">
          Already have an account?{" "}
          <Anchor size="md" component={Link} className="font-semibold" to="/login">
            Login
          </Anchor>
        </Text>
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
