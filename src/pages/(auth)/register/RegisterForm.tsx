import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock, IconRegistered } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import PasswordInputWithStrength from "../../../components/PasswordStrength/PasswordInputWithStrength";
import { RegisterFormValues, registerSchema } from "../../../features/auth/identity.schema";
import { RegisterCommand } from "../../../features/auth/identity.types";
import { useRegister } from "../../../features/auth/identity.hooks";
import { formSubmitWithFocus } from "../../../utils/form";
import { extractPasswordRequirements } from "../../../utils/zodHelper";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const form = useForm<RegisterFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "uncontrolled",
    validate: zodResolver(registerSchema),
  });

  // Extract list of password requirements from the schema
  const passwordRequirements = extractPasswordRequirements(
    registerSchema.innerType().shape.password,
  );

  const handleSubmit = (values: RegisterFormValues) => {
    const payload: RegisterCommand = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        navigate(`/confirm-email?email=${encodeURIComponent(payload.email)}`);
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
      <form onSubmit={formSubmitWithFocus(form, handleSubmit)} noValidate>
        <div className="flex items-stretch gap-2 *:grow">
          <TextInput
            label="First Name"
            size="md"
            placeholder="John"
            required
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
            radius="xl"
            classNames={{
              error: "font-bold dark:text-red-500",
            }}
          />
          <TextInput
            label="Last Name"
            size="md"
            placeholder="Doe"
            required
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
            radius="xl"
            classNames={{
              error: "font-bold dark:text-red-500",
            }}
          />
        </div>
        <TextInput
          size="md"
          required
          placeholder="Your email"
          label="Email"
          leftSection={<IconAt size={16} stroke={1.5} />}
          key={form.key("email")}
          {...form.getInputProps("email")}
          radius="xl"
          className="mt-md"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <PasswordInputWithStrength
          size="md"
          withAsterisk
          label="Password"
          placeholder="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          leftSection={<IconLock size={16} stroke={1.5} />}
          requirements={passwordRequirements}
          radius="xl"
          mt="md"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <PasswordInput
          mt="md"
          size="md"
          required
          label="Confirm Password"
          placeholder="Confirm password"
          leftSection={<IconLock size={16} stroke={1.5} />}
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
          radius="xl"
          classNames={{
            error: "font-bold dark:text-red-500",
          }}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            key={form.key("agreeToTerms")}
            {...form.getInputProps("agreeToTerms", { type: "input" })}
            size="md"
            label={
              <>
                I accept to the{" "}
                <Anchor c="blue" target="_blank" inherit defaultChecked>
                  terms and conditions
                </Anchor>
              </>
            }
          />
        </Group>
        <Button
          fullWidth
          mt="lg"
          variant="gradient"
          type="submit"
          radius="2xl"
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
