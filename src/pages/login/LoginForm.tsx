import { Paper, TextInput, PasswordInput, Checkbox, Button, Group, Anchor } from "@mantine/core";
import { IconAt, IconLock, IconLogin2 } from "@tabler/icons-react";
import GoogleIcon from "../../components/IconSvg/GoogleIcon";

const LoginForm = () => {
  return (
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
      <Button fullWidth variant="default" className="mt-5" leftSection={<GoogleIcon />}>
        Continue with Google
      </Button>
    </Paper>
  );
};
export default LoginForm;
