import { Avatar, Button, FileButton, Group, Radio, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCamera } from "@tabler/icons-react";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import avatarPlaceholder from "../../../assets/placeholder/profile-avatar-placeholder.svg";
import { ALLOWED_IMAGE_TYPES } from "../../../constants/ValidationConstants";
import {
  UpdateUserProfileFormType,
  updateUserProfileSchema,
} from "../../../react-query/auth/identity.schema";
import {
  CurrentUser,
  Gender,
  UpdateUserProfileSelfCommand,
} from "../../../react-query/auth/identity.types";
import { useUpdateUserProfileSelf } from "../../../react-query/auth/identityHooks";
import { formSubmitWithFocus } from "../../../utils/form";

type UpdateUserProfileFormProps = {
  user: CurrentUser;
};

export default function UpdateUserProfileForm({ user }: UpdateUserProfileFormProps) {
  const updateUserProfileMutation = useUpdateUserProfileSelf();

  const form = useForm<UpdateUserProfileFormType>({
    mode: "uncontrolled",
    initialValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
      gender: user.gender ?? Gender.Other,
      avatar: user.avatarUrl ?? "",
    },
    validate: zodResolver(updateUserProfileSchema),
  });

  const handleSubmit = (values: UpdateUserProfileFormType) => {
    const payload: UpdateUserProfileSelfCommand = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth || undefined, // string
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
              form.setDirty({ avatar: true });
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
            pointer
            valueFormat="DD/MM/YYYY"
            className="w-full"
            maxDate={new Date()}
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
        onClick={formSubmitWithFocus(form, handleSubmit)}
      >
        Update Information
      </Button>
    </div>
  );
}
