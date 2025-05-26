import { Avatar, Button, Group, Radio, TextInput, Title, Loader, FileButton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { IconCamera } from "@tabler/icons-react";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../constants/ValidationConstants";
import { Gender, UpdateUserProfileCommand } from "../../react-query/auth/identity.types";
import { useCurrentUser, useUpdateUserProfile } from "../../react-query/auth/identityHooks";
import { formSubmitWithFocus } from "../../utils/form";
import dayjs from "dayjs";
import { parseDateUTC } from "../../utils/format";

const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.nativeEnum(Gender, {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender selected",
  }),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date format",
    })
    .max(new Date(), "Date of birth cannot be in the future"),
  avatar: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .or(z.string()),
});

export type UpdateUserProfileFormType = z.infer<typeof UpdateUserProfileSchema>;

export default function MyAccountPage() {
  const { data, isPending, isError } = useCurrentUser();

  const updateUserProfileMutation = useUpdateUserProfile();

  if (isPending) {
    return <Loader />;
  }

  if (isError || !data) {
    return <div>Error loading user data</div>;
  }

  const form = useForm<UpdateUserProfileFormType>({
    mode: "uncontrolled",
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dayjs(data.dateOfBirth).toDate(),
      gender: data.gender,
      avatar: data.avatarUrl,
    },
    validate: zodResolver(UpdateUserProfileSchema),
  });

  const handleSubmit = (values: UpdateUserProfileFormType) => {
    const payload: UpdateUserProfileCommand = {
      firstName: values.firstName,
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

  return (
    <div>
      <Title order={2} className="mb-3">
        Personal Information
      </Title>
      <div className="w-full px-4 bg-body rounded-md border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="rounded-xl max-w-(--container-md) mx-auto px-2 py-4 md:py-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Avatar
              size={100}
              radius="full"
              key={form.key("avatar")}
              src={
                form.values.avatar instanceof File
                  ? URL.createObjectURL(form.values.avatar)
                  : data.avatarUrl
              }
            />
            <FileButton
              accept={ALLOWED_IMAGE_TYPES.join(",")}
              {...form.getInputProps("avatar")}
              key={form.key("avatar")}
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
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid items-center grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                {...form.getInputProps("firstName")}
                key={form.key("firstName")}
                placeholder="Enter your first name"
                size="md"
                required
              />
              <TextInput
                label="Last Name"
                {...form.getInputProps("lastName")}
                key={form.key("lastName")}
                placeholder="Enter your last name"
                size="md"
                required
              />
            </div>
            <TextInput
              label="Email"
              defaultValue={data.email}
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
                <Group gap="md">
                  <Radio value={Gender.Male} label="Male" />
                  <Radio value={Gender.Female} label="Female" />
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
            onClick={() => formSubmitWithFocus(form, handleSubmit)()}
            disabled={!form.isDirty()}
          >
            Update Information
          </Button>
        </div>
      </div>
    </div>
  );
}
