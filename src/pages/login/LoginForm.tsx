import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useGoogleLogin } from "@react-oauth/google";
import { IconAt, IconLock, IconLogin2 } from "@tabler/icons-react";
import GoogleIcon from "../../components/svg-icons/GoogleIcon";
import { LoginCommand, loginSchema } from "../../react-query/auth/identity.types";
import { useLogin, useLoginWithGoogle } from "../../react-query/auth/identityHooks";

// Zod schema for login form validation

const LoginForm = () => {
  const form = useForm<LoginCommand>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const { isPending: isLoginPending, mutate: loginMutate } = useLogin();
  const { isPending: isLoginWithGooglePending, mutate: loginWithGoogleMutate } =
    useLoginWithGoogle();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse) {
        loginWithGoogleMutate({ idToken: tokenResponse.access_token });
      } else {
        console.error("Google login failed: No token response received.");
      }
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    loginMutate(values);
  };

  return (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      className="rounded-[15px] bg-white/80 dark:bg-neutral-900/80 border border-white/30 backdrop-blur-md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <TextInput
          mt="md"
          required
          label="Email"
          placeholder="Your email"
          type="email"
          leftSection={<IconAt size={16} stroke={1.5} />}
          {...form.getInputProps("email")}
          radius="xl"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />

        <PasswordInput
          mt="md"
          required
          label="Password"
          type="password"
          placeholder="Password"
          leftSection={<IconLock size={16} stroke={1.5} />}
          {...form.getInputProps("password")}
          radius="xl"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox
            label="Remember me"
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />
          <Anchor size="sm">Forgot password?</Anchor>
        </Group>

        <Button
          fullWidth
          mt="xl"
          type="submit"
          variant="gradient"
          gradient={{ from: "red", to: "pink", deg: 90 }}
          rightSection={<IconLogin2 />}
          loading={isLoginPending}
        >
          Sign in
        </Button>
      </form>

      <Button
        fullWidth
        variant="default"
        className="mt-5"
        leftSection={<GoogleIcon />}
        onClick={() => login()}
        loading={isLoginWithGooglePending}
      >
        Continue with Google
      </Button>
    </Paper>
  );
};

export default LoginForm;
