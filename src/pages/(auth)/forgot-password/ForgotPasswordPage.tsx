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
import { isEmail, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconLock } from "@tabler/icons-react";
import { ArrowLeftIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorCode } from "../../../api-client/api.types";
import PasswordInputWithStrength from "../../../components/PasswordStrength/PasswordInputWithStrength";
import {
  useResetPassword,
  useSendResetPasswordOtp,
  useValidateResetPasswordOtp,
} from "../../../features/auth/identity.hooks";
import { changePasswordSchema } from "../../../features/auth/identity.schema";
import { useCountdown } from "../../../hooks/useCountDown";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { extractPasswordRequirements } from "../../../utils/zodHelper";

export default function ForgotPasswordPage() {
  usePageSEO({ title: "Forgot Password" });

  const navigate = useNavigate();
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");

  const [active, setActive] = useState(0);
  const [otpValue, setOtpValue] = useState("");

  const sendOtpMutation = useSendResetPasswordOtp();
  const verifyOtpMutation = useValidateResetPasswordOtp();
  const resetPasswordMutation = useResetPassword();

  const [emailSent, setEmailSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    seconds: secondsLeft,
    reset: resetCountdown,
    isRunning: isCountingDown,
  } = useCountdown(60);

  const emailForm = useForm({
    initialValues: { email: "" },
    validate: { email: isEmail("Invalid email") },
  });

  const changePasswordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(changePasswordSchema),
  });

  // Extract list of password requirements from the schema
  const passwordRequirements = extractPasswordRequirements(
    changePasswordSchema.innerType().shape.password,
  );

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
          resetCountdown();
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

  const handleResetPassword = (values: typeof changePasswordForm.values) => {
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
        <Text ta="center" className="text-gray-700 dark:text-gray-300 mb-3">
          Follow the steps below to reset your password securely.
        </Text>
        <Group justify="center" mb="sm">
          <Button
            variant="subtle"
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
                className="mt-2"
                {...emailForm.getInputProps("email")}
                key={emailForm.key("email")}
              />
              <Button
                className="mx-auto max-w-sm mt-6"
                fullWidth
                onClick={handleSendOtp}
                loading={sendOtpMutation.isPending}
              >
                Continue
              </Button>
            </Stepper.Step>

            {/* Step 2: OTP Verification */}
            <Stepper.Step label="Verify OTP" description="Enter code from email">
              <div className="flex flex-col items-center">
                <Text className="text-gray-700 dark:text-gray-300">
                  A 6-digit code was sent to: <b>{emailForm.values.email}</b>
                </Text>
                <Group justify="center" className="mt-6">
                  <PinInput
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    oneTimeCode
                    size="md"
                    disabled={verifyOtpMutation.isPending}
                  />
                </Group>
                <Group justify="center" className="mt-4">
                  <Button
                    variant="subtle"
                    mt="xs"
                    onClick={handleSendOtp}
                    disabled={isCountingDown}
                    loading={sendOtpMutation.isPending}
                  >
                    {secondsLeft > 0 ? `Resend after ${secondsLeft} (s)` : "Resend Code"}
                  </Button>
                  <Button mt="sm" onClick={handleVerifyOtp} loading={verifyOtpMutation.isPending}>
                    Verify OTP
                  </Button>
                </Group>
              </div>
            </Stepper.Step>

            {/* Step 3: New Password */}
            <Stepper.Step label="Reset Password" description="Set a new password">
              <form
                onSubmit={changePasswordForm.onSubmit(handleResetPassword)}
                className="space-y-4"
              >
                <PasswordInputWithStrength
                  withAsterisk
                  label="New Password"
                  placeholder="New Password"
                  key={changePasswordForm.key("password")}
                  {...changePasswordForm.getInputProps("password")}
                  leftSection={<IconLock size={16} stroke={1.5} />}
                  requirements={passwordRequirements}
                  mt="md"
                  size="md"
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  size="md"
                  leftSection={<IconLock size={16} stroke={1.5} />}
                  key={changePasswordForm.key("confirmPassword")}
                  {...changePasswordForm.getInputProps("confirmPassword")}
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
}
