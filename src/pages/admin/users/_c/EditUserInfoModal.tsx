import { Avatar, Button, FileButton, Group, Modal, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { UserVm, UpdateUserCommand } from "../../../../react-query/user/user.types";

interface EditUserModalProps {
  opened: boolean;
  onClose: () => void;
  user: UserVm | null;
  onSubmit: (input: UpdateUserCommand) => void;
}

export function EditUserInfoModal({ opened, onClose, user, onSubmit }: EditUserModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<UpdateUserCommand>({
    initialValues: {
      id: user?.id ?? "",
      firstName: "",
      lastName: "",
      displayName: "",
      dateOfBirth: "",
      professionalTitle: "",
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      const [firstName, ...rest] = user.fullName?.split(" ") ?? [];
      form.setValues({
        id: user.id,
        firstName: firstName ?? "",
        lastName: rest.join(" "),
        displayName: user.displayName ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
        professionalTitle: user.professionalTitle ?? "",
        avatar: undefined,
      });
      setPreviewUrl(null);
    }
  }, [user]);

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
    onClose();
  });

  const handleAvatarChange = (file: File | null) => {
    form.setFieldValue("avatar", file || undefined);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={4}>Edit User Profile</Title>}
      size="lg"
      centered
    >
      <form onSubmit={handleSubmit} className="space-y-5 px-1 py-2">
        {/* Avatar section */}
        <div className="flex flex-col items-center gap-2">
          <Avatar src={previewUrl ?? user?.avatarUrl ?? user?.fullName} size={96} radius="xl" />
          <FileButton accept="image/*" onChange={handleAvatarChange}>
            {(props) => (
              <Button size="xs" variant="outline" {...props}>
                Change Avatar
              </Button>
            )}
          </FileButton>
          {form.values.avatar && (
            <Text size="xs" c="dimmed">
              Selected file: {form.values.avatar.name}
            </Text>
          )}
        </div>

        {/* Email */}
        <TextInput
          label="Email"
          value={user?.email ?? ""}
          readOnly
          disabled
          description="User's email used for login and identification"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="First Name"
            placeholder="e.g. John"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="e.g. Smith"
            required
            {...form.getInputProps("lastName")}
          />
          <TextInput
            label="Display Name"
            placeholder="e.g. Barack Obama"
            description="Name displayed publicly for instructor profile"
            {...form.getInputProps("displayName")}
          />
          <TextInput
            label="Professional Title"
            description="User's current job title or role"
            placeholder="e.g. Full-Stack Developer"
            {...form.getInputProps("professionalTitle")}
          />
        </div>

        <DateInput
          label="Date of Birth"
          description="Used for analytics and public profile info"
          value={form.values.dateOfBirth ? new Date(form.values.dateOfBirth) : null}
          onChange={(date) => form.setFieldValue("dateOfBirth", date ? date.toISOString() : "")}
        />

        <Group justify="end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="blue">
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
