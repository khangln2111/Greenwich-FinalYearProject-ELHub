import { Box, Button, Container, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, Link } from "react-router-dom";
import { useSendResetPasswordOtp } from "../../../react-query/auth/identityHooks";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Please enter a valid email address"),
    },
  });

  const { mutate: sendOtp, isPending } = useSendResetPasswordOtp();

  const handleSubmit = (values: typeof form.values) => {
    sendOtp(values, {
      onSuccess: () => {
        sessionStorage.setItem("reset-email", values.email);
        navigate("/forgot-password/verify");
      },
    });
  };

  return (
    <Box
      className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-cyan-200 to-pink-300
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      <Container size={480} p="md">
        <Title order={2} ta="center" className="font-bold mb-2 text-gray-900 dark:text-white">
          Forgot your password?
        </Title>

        <Text ta="center" size="sm" mb="md" className="text-gray-700 dark:text-gray-300">
          Enter your email address and we’ll send you a One-Time Password (OTP) to reset your
          password.
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-white/30 backdrop-blur-md"
        >
          <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
            <TextInput
              label="Email"
              placeholder="you@example.com"
              required
              {...form.getInputProps("email")}
              classNames={{ label: "font-semibold text-gray-800 dark:text-gray-200" }}
            />

            <Button type="submit" fullWidth loading={isPending}>
              Send OTP
            </Button>
          </form>

          <Text size="sm" ta="center" mt="md" className="text-gray-700 dark:text-gray-400">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Back to login
            </Link>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
