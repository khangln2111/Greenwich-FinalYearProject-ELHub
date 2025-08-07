import { Avatar, Button, FileButton, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCamera } from "@tabler/icons-react";
import { z } from "zod";
import { MAX_IMAGE_SIZE_MB, ALLOWED_IMAGE_TYPES } from "../../../constants/ValidationConstants";
import {
  UpdateWorkProfileSelfCommand,
  WorkProfileVm,
} from "../../../react-query/auth/identity.types";
import { zodResolver } from "mantine-form-zod-resolver";
import { useUpdateWorkProfileSelf } from "../../../react-query/auth/identityHooks";
import { formSubmitWithFocus } from "../../../utils/form";
import avatarPlaceholder from "../../../assets/placeholder/profile-avatar-placeholder.svg";

const UpdateWorkProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  professionalTitle: z.string().optional(),
  about: z.string().max(2000, "About must be under 2000 characters").optional(),
  favoriteQuote: z.string().optional(),
  favoriteQuoteCite: z.string().optional(),
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

export type UpdateWorkProfileFormType = z.infer<typeof UpdateWorkProfileSchema>;

type Props = {
  profile: WorkProfileVm;
};

export default function UpdateWorkProfileForm({ profile }: Props) {
  const updateWorkProfileMutation = useUpdateWorkProfileSelf();

  const form = useForm<UpdateWorkProfileFormType>({
    mode: "uncontrolled",
    initialValues: {
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      professionalTitle: profile.professionalTitle ?? "",
      about: profile.about ?? "",
      favoriteQuote: profile.favoriteQuote ?? "",
      favoriteQuoteCite: profile.favoriteQuoteCite ?? "",
      avatar: profile.avatarUrl ?? "",
    },
    validate: zodResolver(UpdateWorkProfileSchema),
  });

  const avatar = form.getValues().avatar;

  const handleSubmit = (values: UpdateWorkProfileFormType) => {
    const payload: UpdateWorkProfileSelfCommand = {
      firstName: values.firstName,
      lastName: values.lastName,
      professionalTitle: values.professionalTitle,
      about: values.about,
      favoriteQuote: values.favoriteQuote,
      favoriteQuoteCite: values.favoriteQuoteCite,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };

    updateWorkProfileMutation.mutate(payload, {
      onSuccess: () => form.resetDirty(),
    });
  };

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
              : profile.avatarUrl || avatarPlaceholder
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
              Change work avatar
            </Button>
          )}
        </FileButton>
        {form.errors.workAvatar && (
          <div className="mt-1 text-xs text-red-600">{form.errors.workAvatar}</div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Group grow>
          <TextInput
            label="First Name"
            size="md"
            placeholder="e.g. John"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            size="md"
            placeholder="e.g. Doe"
            {...form.getInputProps("lastName")}
          />
        </Group>

        <TextInput
          label="Professional Title"
          placeholder="e.g. Software Engineer"
          size="md"
          key={form.key("professionalTitle")}
          {...form.getInputProps("professionalTitle")}
        />

        <Textarea
          label="About"
          placeholder="Tell us about your background and things you are passionate about"
          autosize
          minRows={3}
          maxRows={6}
          size="md"
          key={form.key("about")}
          {...form.getInputProps("about")}
        />

        <Textarea
          label="Favorite Quote"
          placeholder="e.g. “Learning never exhausts the mind.”"
          autosize
          minRows={2}
          maxRows={4}
          size="md"
          key={form.key("favoriteQuote")}
          {...form.getInputProps("favoriteQuote")}
        />

        <TextInput
          label="Quote Author / Source"
          placeholder="e.g. Leonardo da Vinci"
          size="md"
          key={form.key("favoriteQuoteCite")}
          {...form.getInputProps("favoriteQuoteCite")}
        />
      </div>

      <Button
        fullWidth
        className="mt-6"
        radius="md"
        size="md"
        loading={updateWorkProfileMutation.isPending}
        disabled={!form.isDirty()}
        onClick={formSubmitWithFocus(form, handleSubmit)}
      >
        Update Work Profile
      </Button>
    </div>
  );
}
