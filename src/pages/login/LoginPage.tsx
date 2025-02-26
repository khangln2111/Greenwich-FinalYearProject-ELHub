import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { IconAt, IconLock, IconLogin2 } from "@tabler/icons-react";

const LoginPage = () => {
  return (
    <Box className={classes.container}>
      <Container size={500} flex={1}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="md" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" c="blue" component={Link} to="/register">
            Create account
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            mt="md"
            required
            placeholder="Your email"
            label="Email"
            leftSection={<IconAt size={16} stroke={1.5} />}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="Password"
            label="Password"
            leftSection={<IconLock size={16} stroke={1.5} />}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            variant="gradient"
            gradient={{ from: "red", to: "pink", deg: 90 }}
            rightSection={<IconLogin2 />}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
