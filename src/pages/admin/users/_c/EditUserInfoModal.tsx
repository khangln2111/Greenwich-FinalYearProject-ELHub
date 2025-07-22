import { Avatar, Button, FileButton, Group, Stack, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { CalendarIcon, CameraIcon } from "lucide-react";
import { z } from "zod";
import avatarPlaceholder from "../../../../assets/placeholder/profile-avatar-placeholder.svg";
import CusModal from "../../../../components/CusModal";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../../constants/ValidationConstants";
import { UpdateUserCommand, UserVm } from "../../../../react-query/user/user.types";
import { formSubmitWithFocus } from "../../../../utils/form";

const EditUserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  professionalTitle: z.string().optional(),
  dateOfBirth: z.string().optional(),
  avatar: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .optional()
    .or(z.string()),
});

type EditUserFormValues = z.infer<typeof EditUserSchema>;

type Props = {
  opened: boolean;
  onClose: () => void;
  user: UserVm;
  onSubmit: (values: UpdateUserCommand) => void;
};

export default function EditUserInfoModal({ opened, onClose, user, onSubmit }: Props) {
  const form = useForm<EditUserFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(EditUserSchema),
    initialValues: {
      id: user.id,
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
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      professionalTitle: values.professionalTitle,
      dateOfBirth: values.dateOfBirth,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Edit User Info" size="700px">
      <Stack gap="xl">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <Avatar
            size={100}
            radius="xl"
            className="shadow-lg border"
            src={
              avatar instanceof File
                ? URL.createObjectURL(avatar)
                : user.avatarUrl || user.firstName + " " + user.lastName || avatarPlaceholder
            }
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
                variant="light"
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
        <Stack>
          <TextInput
            label="Email"
            value={user.email}
            disabled
            readOnly
            description="Email cannot be changed"
          />

          <Group grow>
            <TextInput
              label="First Name"
              placeholder="e.g. John"
              {...form.getInputProps("firstName")}
              description="User's given name"
            />
            <TextInput
              label="Last Name"
              placeholder="e.g. Doe"
              {...form.getInputProps("lastName")}
              description="User's family name"
            />
          </Group>

          <TextInput
            label="Professional Title"
            placeholder="e.g. UI Designer"
            {...form.getInputProps("professionalTitle")}
            description="Optional: Showcases their profession or role"
          />

          <DateInput
            {...form.getInputProps("dateOfBirth")}
            key={form.key("dateOfBirth")}
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

        {/* Submit */}
        <Button
          fullWidth
          radius="md"
          size="md"
          disabled={!form.isDirty()}
          onClick={() => formSubmitWithFocus(form, handleSubmit)()}
        >
          Save Changes
        </Button>
      </Stack>
    </CusModal>
  );
}
