import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAt, IconLock, IconRegistered } from "@tabler/icons-react";
import { z } from "zod";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";

// Zod schema for form validation
const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, "Password must include at least one special symbol"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Confirm passwords must match password",
    path: ["confirmPassword"],
  });

// Function to extract password requirements from the Zod schema
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
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validate: zodResolver(schema),
    validateInputOnChange: true,
  });

  const passwordRequirements = getPasswordRequirements(schema.innerType());

  return (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={20}
      radius="md"
      className="rounded-[15px] bg-white/80 dark:bg-neutral-900/80 border border-white/30 backdrop-blur-md"
    >
      <Group grow>
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
      </Group>
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
              I accept
              <Anchor c="blue" href="https://mantine.dev" target="_blank" inherit>
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
        gradient={{ from: "red", to: "pink", deg: 90 }}
        rightSection={<IconRegistered />}
        // disabled={!form.isValid()}
      >
        Register
      </Button>
    </Paper>
  );
};

export default RegisterForm;
