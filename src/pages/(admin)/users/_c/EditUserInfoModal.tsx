import { Avatar, Button, FileButton, Group, Stack, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { CalendarIcon, CameraIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { ALLOWED_IMAGE_TYPES } from "../../../../constants/ValidationConstants";
import { EditUserFormValues, editUserSchema } from "../../../../features/user/user.schema";
import { UpdateUserCommand, UserVm } from "../../../../features/user/user.types";
import { useUpdateUser } from "../../../../features/user/user.hooks";
import { formSubmitWithFocus } from "../../../../utils/form";
import CusModal from "../../../../components/CusModal/CusModal";

type Props = {
  opened: boolean;
  onClose: () => void;
  user: UserVm;
};

export default function EditUserInfoModal({ opened, onClose, user }: Props) {
  const updateUserMutation = useUpdateUser();

  const form = useForm<EditUserFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(editUserSchema),
    initialValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      professionalTitle: user.professionalTitle ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
      avatar: user.avatarUrl ?? "",
    },
  });

  const avatar = form.getValues().avatar;

  const handleSubmit = (values: EditUserFormValues) => {
    const payload: UpdateUserCommand = {
      id: user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      professionalTitle: values.professionalTitle,
      dateOfBirth: values.dateOfBirth,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };

    updateUserMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Edit User Info"
      size="600px"
      footer={
        <div className="flex gap-4 justify-end items-center flex-wrap">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            radius="md"
            disabled={!form.isDirty()}
            loading={updateUserMutation.isPending}
            onClick={() => formSubmitWithFocus(form, handleSubmit)()}
          >
            Save
          </Button>
        </div>
      }
    >
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-3">
        <Avatar
          size={100}
          radius="full"
          className="shadow-md"
          color="initials"
          src={avatar instanceof File ? URL.createObjectURL(avatar) : user.avatarUrl}
          name={user.fullName ?? undefined}
        />
        <FileButton
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          key={form.key("avatar")}
          onChange={(file) => {
            if (file) {
              form.setFieldValue("avatar", file);
              form.setDirty({ avatar: true });
            }
          }}
        >
          {(props) => (
            <Button
              variant="subtle"
              {...props}
              leftSection={<CameraIcon size={16} />}
              className="text-sm"
            >
              Change Avatar
            </Button>
          )}
        </FileButton>
        {form.errors.avatar && (
          <Text size="xs" c="red">
            {form.errors.avatar}
          </Text>
        )}
      </div>

      {/* Form Fields */}
      <Stack className="mt-2">
        <Group grow>
          <TextInput
            label="First Name"
            size="md"
            placeholder="e.g. John"
            {...form.getInputProps("firstName")}
            key={form.key("firstName")}
          />
          <TextInput
            label="Last Name"
            size="md"
            placeholder="e.g. Doe"
            {...form.getInputProps("lastName")}
            key={form.key("lastName")}
          />
        </Group>
        <TextInput
          label="Email"
          size="md"
          value={user.email}
          disabled
          readOnly
          description="Email cannot be changed"
        />

        <TextInput
          label="Title"
          placeholder="e.g. UI Designer"
          size="md"
          {...form.getInputProps("professionalTitle")}
          key={form.key("professionalTitle")}
          description="Optional: Showcases their profession or role"
        />

        <DateInput
          {...form.getInputProps("dateOfBirth")}
          key={form.key("dateOfBirth")}
          size="md"
          label="Date of Birth"
          hideWeekdays
          rightSection={<CalendarIcon size={16} />}
          placeholder="Birth date"
          pointer
          valueFormat="DD/MM/YYYY"
          className="w-full"
          maxDate={new Date()}
        />
      </Stack>
    </CusModal>
  );
}
