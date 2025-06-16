import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PinInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmEmail, useSendEmailConfirmationOtp } from "../react-query/auth/identityHooks";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");

  const confirmEmail = useConfirmEmail();
  const sendOtp = useSendEmailConfirmationOtp();

  const handleConfirm = () => {
    if (otp.length !== 6 || !email) return;
    confirmEmail.mutate(
      { email, otp },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  const handleResend = () => {
    if (!email) return;
    sendOtp.mutate({ email });
  };

  return (
    <Box
      className="flex justify-center items-center min-h-dvh px-2 bg-gradient-to-br from-blue-100 to-purple-200
        dark:from-gray-900 dark:to-gray-800"
    >
      <Container size={420}>
        <Title ta="center" order={2} className="text-gray-900 dark:text-white font-bold mb-1">
          Verify Your Email
        </Title>
        <Text ta="center" size="sm" className="text-gray-700 dark:text-gray-300 mb-3 text-center">
          A 6-digit code has been sent to your email. Please enter it below to verify your account.
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={24}
          radius="md"
          className="rounded-2xl bg-white dark:bg-neutral-900 border border-white/30"
        >
          {/* Disabled Email Input */}
          <TextInput label="Email" value={email} disabled className="mb-4" />

          {/* OTP Input */}
          <Group justify="center" mb="md">
            <PinInput length={6} value={otp} onChange={setOtp} oneTimeCode />
          </Group>

          {/* Confirm Button */}
          <Button
            fullWidth
            onClick={handleConfirm}
            loading={confirmEmail.isPending}
            className="mb-3"
          >
            Confirm Email
          </Button>

          {/* Resend + Back Buttons */}
          <Group justify="space-between" grow>
            <Button variant="subtle" size="xs" onClick={handleResend} loading={sendOtp.isPending}>
              Resend Code
            </Button>
            <Button variant="subtle" size="xs" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyEmailPage;
