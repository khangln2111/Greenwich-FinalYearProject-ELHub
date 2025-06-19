import { Avatar, Button, FileButton, Group, Radio, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { IconCamera } from "@tabler/icons-react";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../constants/ValidationConstants";
import {
  CurrentUser,
  Gender,
  UpdateUserProfileSelfCommand,
} from "../../../react-query/auth/identity.types";
import { useUpdateUserProfile } from "../../../react-query/auth/identityHooks";
import { formSubmitWithFocus } from "../../../utils/form";
import { parseDateUTC } from "../../../utils/format";
import avatarPlaceholder from "../../../assets/placeholder/profile-avatar-placeholder.svg";

const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date format",
    })
    .max(new Date(), "Date of birth cannot be in the future"),
  avatar: z
    .instanceof(File, {
      message: "Profile photo is required",
    })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .or(z.string()),
});

export type UpdateUserProfileFormType = z.infer<typeof UpdateUserProfileSchema>;

type UpdateUserProfileFormProps = {
  user: CurrentUser;
};

export default function UpdateUserProfileForm({ user }: UpdateUserProfileFormProps) {
  const updateUserProfileMutation = useUpdateUserProfile();

  const form = useForm<UpdateUserProfileFormType>({
    mode: "uncontrolled",
    initialValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      dateOfBirth: new Date(user.dateOfBirth) ?? new Date(),
      gender: user.gender ?? Gender.Other,
      avatar: user.avatarUrl ?? "",
    },
    validate: zodResolver(UpdateUserProfileSchema),
  });

  const handleSubmit = (values: UpdateUserProfileFormType) => {
    const payload: UpdateUserProfileSelfCommand = {
      displayName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };

    updateUserProfileMutation.mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
      },
    });
  };

  const avatar = form.getValues().avatar;

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mb-6">
        <Avatar
          size={100}
          radius="full"
          className="shadow-lg border"
          src={
            avatar instanceof File
              ? URL.createObjectURL(avatar)
              : user.avatarUrl || avatarPlaceholder
          }
        />
        <FileButton
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          key={form.key("avatar")}
          onChange={(file) => {
            if (file) {
              form.setFieldValue("avatar", file);
              form.setDirty({
                avatar: true,
              });
            }
          }}
        >
          {(props) => (
            <Button
              variant="subtle"
              {...props}
              leftSection={<IconCamera size={16} />}
              className="text-sm"
            >
              Change profile photo
            </Button>
          )}
        </FileButton>
        {form.errors.avatar && (
          <div className="mt-1 text-xs text-red-600">{form.errors.avatar}</div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid items-start grid-cols-2 gap-4">
          <TextInput
            label="First Name"
            {...form.getInputProps("firstName")}
            key={form.key("firstName")}
            placeholder="Enter your first name"
            size="md"
          />
          <TextInput
            label="Last Name"
            {...form.getInputProps("lastName")}
            key={form.key("lastName")}
            placeholder="Enter your last name"
            size="md"
          />
        </div>
        <TextInput
          label="Email"
          defaultValue={user.email}
          placeholder="Enter your email"
          disabled
          size="md"
        />
        <div>
          <label className="font-medium block mb-1">Gender</label>
          <Radio.Group
            {...form.getInputProps("gender")}
            key={form.key("gender")}
            size="md"
            variant="outline"
          >
            <Group>
              <Radio key={Gender.Male} value={Gender.Male} label="Male" />
              <Radio key={Gender.Female} value={Gender.Female} label="Female" />
            </Group>
          </Radio.Group>
        </div>
        <div>
          <DateInput
            {...form.getInputProps("dateOfBirth")}
            key={form.key("dateOfBirth")}
            label="Date of Birth"
            hideWeekdays
            rightSection={<CalendarIcon size={16} />}
            placeholder="Birth date"
            size="md"
            pointer={true}
            valueFormat="DD/MM/YYYY"
            className="w-full"
            maxDate={new Date()}
            dateParser={parseDateUTC}
          />
        </div>
      </div>
      <Button
        fullWidth
        className="mt-6"
        radius="md"
        size="md"
        loading={updateUserProfileMutation.isPending}
        disabled={!form.isDirty()}
        onClick={() => formSubmitWithFocus(form, handleSubmit)()}
      >
        Update Information
      </Button>
    </div>
  );
}
