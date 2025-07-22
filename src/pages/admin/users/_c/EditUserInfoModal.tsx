import { Avatar, Button, FileInput, Group, Modal, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { UserVm, UpdateUserCommand } from "../../../../react-query/user/user.types";
import { useUpdateUserProfileSelf } from "../../../../react-query/auth/identityHooks";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  displayName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  professionalTitle: z.string().optional(),
  avatar: z.any().optional(),
});

interface Props {
  user: UserVm;
  opened: boolean;
  onClose: () => void;
}

export default function EditUserInfoModal({ user, opened, onClose }: Props) {
  const { mutate: updateUser, isPending } = use();

  const form = useForm<UpdateUserCommand>({
    initialValues: {
      id: user.id,
      firstName: user.fullName.split(" ")[0] || "",
      lastName: user.fullName.split(" ").slice(1).join(" ") || "",
      displayName: user.fullName,
      avatar: undefined,
      dateOfBirth: user.dateOfBirth,
      professionalTitle: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: UpdateUserCommand) => {
    updateUser(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User Info" size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group grow>
            <TextInput label="First Name" {...form.getInputProps("firstName")} />
            <TextInput label="Last Name" {...form.getInputProps("lastName")} />
          </Group>
          <TextInput label="Display Name" {...form.getInputProps("displayName")} />
          <TextInput label="Professional Title" {...form.getInputProps("professionalTitle")} />
          <DateInput label="Date of Birth" {...form.getInputProps("dateOfBirth")} />
          <FileInput label="Avatar" accept="image/*" {...form.getInputProps("avatar")} />
        </Stack>

        <Group justify="end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
