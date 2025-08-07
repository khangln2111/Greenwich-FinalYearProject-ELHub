import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  PinInput,
  Stepper,
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
} from "../../../features/auth/identityHooks";
import { useMediaQuery } from "@mantine/hooks";
import { ErrorCode } from "../../../api-client/api.types";
import { ArrowLeftIcon } from "lucide-react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");

  const [active, setActive] = useState(0);
  const [otpValue, setOtpValue] = useState("");

  const sendOtpMutation = useSendResetPasswordOtp();
  const verifyOtpMutation = useValidateResetPasswordOtp();
  const resetPasswordMutation = useResetPassword();

  const [emailSent, setEmailSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const emailForm = useForm({
    initialValues: { email: "" },
    validate: { email: isEmail("Invalid email") },
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

  const canProceedToStep = (step: number) => {
    if (step === 0) return true;
    if (step === 1) return emailSent;
    if (step === 2) return emailSent && otpVerified;
    return false;
  };

  const handleSendOtp = () => {
    const { hasErrors } = emailForm.validate();
    if (hasErrors) return;

    sendOtpMutation.mutate(
      { email: emailForm.values.email },
      {
        onSuccess: () => {
          setEmailSent(true);
          setActive(1);
        },
      },
    );
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) {
      return;
    }

    verifyOtpMutation.mutate(
      {
        email: emailForm.values.email,
        otp: otpValue,
      },
      {
        onSuccess: () => {
          setOtpVerified(true);
          setActive(2);
        },
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
        onError: (error) => {
          if (error.response?.status === 400) {
            if (error.response.data.errorCode === ErrorCode.InvalidOtp && otpVerified) {
              verifyOtpMutation.reset();
              setOtpVerified(false);
              setActive(1);
            }
          }
        },
      },
    );
  };

  return (
    <Box
      className="flex justify-center items-center min-h-dvh px-2 bg-gradient-to-br from-cyan-200 to-pink-300
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      <Container size={800} flex={1}>
        <Title ta="center" order={2} className="text-gray-900 dark:text-white font-bold mb-1">
          Forgot your password?
        </Title>
        <Text ta="center" size="sm" className="text-gray-700 dark:text-gray-300 mb-3">
          Follow the steps below to reset your password securely.
        </Text>
        <Group justify="center" mb="sm">
          <Button
            variant="subtle"
            size="sm"
            onClick={() => navigate("/login")}
            leftSection={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Back to Login
          </Button>
        </Group>

        <Paper
          withBorder
          shadow="md"
          p={24}
          radius="md"
          className="rounded-2xl bg-white dark:bg-neutral-900 border border-white/30"
        >
          <Stepper
            active={active}
            onStepClick={(step) => {
              if (canProceedToStep(step)) setActive(step);
            }}
            classNames={{
              content: "max-sm:pt-0",
            }}
            orientation={isTabletOrLarger ? "horizontal" : "vertical"}
          >
            {/* Step 1: Email */}
            <Stepper.Step label="Email" description="Send verification code">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                size="md"
                {...emailForm.getInputProps("email")}
              />
              <Button mt="sm" fullWidth onClick={handleSendOtp} loading={sendOtpMutation.isPending}>
                Send OTP
              </Button>
            </Stepper.Step>

            {/* Step 2: OTP Verification */}
            <Stepper.Step label="Verify OTP" description="Enter code from email">
              <Text size="sm" className="mb-2 text-gray-700 dark:text-gray-300">
                A 6-digit code was sent to: <b>{emailForm.values.email}</b>
              </Text>
              <Group justify="center">
                <PinInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  oneTimeCode
                  size="md"
                  disabled={verifyOtpMutation.isPending}
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
              <Button
                variant="subtle"
                size="xs"
                mt="xs"
                onClick={handleSendOtp}
                disabled={sendOtpMutation.isPending}
              >
                Resend OTP
              </Button>
            </Stepper.Step>

            {/* Step 3: New Password */}
            <Stepper.Step label="Reset Password" description="Set a new password">
              <form onSubmit={passwordForm.onSubmit(handleResetPassword)} className="space-y-4">
                <PasswordInput
                  label="New Password"
                  {...passwordForm.getInputProps("password")}
                  size="md"
                />
                <PasswordInput
                  label="Confirm Password"
                  size="md"
                  {...passwordForm.getInputProps("confirmPassword")}
                />
                <Button type="submit" fullWidth loading={resetPasswordMutation.isPending}>
                  Reset Password
                </Button>
              </form>
            </Stepper.Step>

            <Stepper.Completed>
              <Text ta="center">Password successfully reset. Redirecting to login...</Text>
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
