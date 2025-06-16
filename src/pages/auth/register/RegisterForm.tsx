import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAt, IconLock, IconRegistered } from "@tabler/icons-react";
import { z } from "zod";
import PasswordStrength from "../../../components/PasswordStrength/PasswordStrength";
import { RegisterCommand, registerSchema } from "../../../react-query/auth/identity.types";
import { useRegister } from "../../../react-query/auth/identityHooks";
import { useNavigate } from "react-router-dom";

function getPasswordRequirements(
  schema: z.ZodObject<any>,
): { label: string; validate: (value: string) => boolean }[] {
  const requirements: { label: string; validate: (value: string) => boolean }[] = [];

  const passwordSchema = schema.shape.password;
  if (passwordSchema instanceof z.ZodString) {
    // Check for .min() validation
    const minLength = passwordSchema._def.checks.find((check) => check.kind === "min");
    if (minLength) {
      requirements.push({
        label: `${minLength.message} characters`,
        validate: (value) => value.length >= minLength.value,
      });
    }

    // Check for .regex() validations
    passwordSchema._def.checks.forEach((check) => {
      if (check.kind === "regex") {
        requirements.push({
          label: check.message || "Invalid password requirement",
          validate: (value) => check.regex.test(value),
        });
      }
    });
  }
  return requirements;
}

const RegisterForm = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const form = useForm<RegisterCommand>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(registerSchema),
  });

  const passwordRequirements = getPasswordRequirements(registerSchema.innerType());

  const handleSubmit = (values: typeof form.values) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={20}
      radius="md"
      className="rounded-[15px] bg-white/80 dark:bg-neutral-900/80 border border-white/30 backdrop-blur-md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <div className="flex items-stretch gap-2 *:grow">
          <TextInput
            label="First Name"
            placeholder="John"
            required
            {...form.getInputProps("firstName")}
            radius="xl"
            classNames={{
              error: "font-bold dark:text-red-500",
            }}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            {...form.getInputProps("lastName")}
            radius="xl"
            classNames={{
              error: "font-bold dark:text-red-500",
            }}
          />
        </div>
        <TextInput
          required
          placeholder="Your email"
          label="Email"
          leftSection={<IconAt size={16} stroke={1.5} />}
          {...form.getInputProps("email")}
          radius="xl"
          className="mt-md"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <PasswordStrength
          withAsterisk
          label="Your password"
          placeholder="Your password"
          password={form.values.password}
          leftSection={<IconLock size={16} stroke={1.5} />}
          requirements={passwordRequirements}
          onPasswordChange={(value) => form.setFieldValue("password", value)}
          radius="xl"
          mt="md"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <PasswordInput
          mt="md"
          required
          label="Confirm Password"
          placeholder="Confirm password"
          leftSection={<IconLock size={16} stroke={1.5} />}
          {...form.getInputProps("confirmPassword")}
          radius="xl"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            label={
              <>
                I accept to the{" "}
                <Anchor c="blue" href="https://mantine.dev" target="_blank" inherit defaultChecked>
                  terms and conditions
                </Anchor>
              </>
            }
          />
        </Group>
        <Button
          fullWidth
          mt="xl"
          variant="gradient"
          type="submit"
          gradient={{ from: "red", to: "pink", deg: 90 }}
          rightSection={<IconRegistered />}
          loading={registerMutation.isPending}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
