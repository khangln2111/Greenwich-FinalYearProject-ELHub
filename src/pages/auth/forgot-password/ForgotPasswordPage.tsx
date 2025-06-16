import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  PinInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, hasLength, isEmail, matchesField } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSendResetPasswordOtp,
  useResetPassword,
  useValidateResetPasswordOtp,
} from "../../../react-query/auth/identityHooks";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [emailSent, setEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const sendOtpMutation = useSendResetPasswordOtp();
  const verifyOtpMutation = useValidateResetPasswordOtp();
  const resetPasswordMutation = useResetPassword();

  const emailForm = useForm({
    initialValues: { email: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const passwordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: hasLength({ min: 6 }, "Password must be at least 6 characters"),
      confirmPassword: matchesField("password", "Passwords do not match"),
    },
  });

  const handleSendOtp = () => {
    const { hasErrors } = emailForm.validate();
    if (hasErrors) return;

    sendOtpMutation.mutate(
      { email: emailForm.values.email },
      {
        onSuccess: () => setEmailSent(true),
      },
    );
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) return;

    verifyOtpMutation.mutate(
      {
        email: emailForm.values.email,
        otp: otpValue,
      },
      {
        onSuccess: () => setIsOtpVerified(true),
      },
    );
  };

  const handleResetPassword = (values: typeof passwordForm.values) => {
    resetPasswordMutation.mutate(
      {
        email: emailForm.values.email,
        otp: otpValue,
        newPassword: values.password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <Box
      className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-cyan-200 to-pink-300
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      <Container size={500} flex={1}>
        <Title order={2} ta="center" className="mb-2 font-bold text-gray-900 dark:text-white">
          Forgot your password?
        </Title>

        <Text ta="center" size="sm" mb="md" className="text-gray-700 dark:text-gray-300">
          Enter your email to receive a verification code.
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-white/30 backdrop-blur-md"
        >
          {/* Email Section */}
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...emailForm.getInputProps("email")}
            disabled={emailSent}
          />
          <Button
            mt="sm"
            fullWidth
            onClick={handleSendOtp}
            loading={sendOtpMutation.isPending}
            disabled={emailSent}
          >
            {emailSent ? "OTP Sent" : "Send OTP"}
          </Button>

          {/* OTP Section */}
          {emailSent && !isOtpVerified && (
            <>
              <Text size="sm" mt="lg" className="text-gray-700 dark:text-gray-300">
                Enter the 6-digit code sent to your email
              </Text>
              <Group justify="center" mt="xs">
                <PinInput
                  length={6}
                  oneTimeCode
                  value={otpValue}
                  onChange={setOtpValue}
                  disabled={isOtpVerified}
                />
              </Group>
              <Button
                mt="sm"
                fullWidth
                onClick={handleVerifyOtp}
                loading={verifyOtpMutation.isPending}
              >
                Verify OTP
              </Button>
            </>
          )}

          {/* New Password Section */}
          {isOtpVerified && (
            <form onSubmit={passwordForm.onSubmit(handleResetPassword)} className="space-y-4 mt-6">
              <PasswordInput label="New Password" {...passwordForm.getInputProps("password")} />
              <PasswordInput
                label="Confirm Password"
                {...passwordForm.getInputProps("confirmPassword")}
              />
              <Button type="submit" fullWidth loading={resetPasswordMutation.isPending}>
                Reset Password
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
