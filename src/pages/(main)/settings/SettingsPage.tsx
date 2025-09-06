import {
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { Bell, Lock, Shield, SlidersHorizontal, Trash2, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserInfo } from "../../../features/auth/identity.hooks";
import UpdateUserProfileForm from "../my-account/_c/UpdateUserProfileForm";

type Section = "profile" | "notifications" | "security" | "preferences" | "danger";

export default function UserSettingsPage() {
  const [section, setSection] = useState<Section>("profile");
  const { data: user, isPending, error } = useGetCurrentUserInfo();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Title order={2} className="text-3xl font-bold tracking-tight">
          Settings
        </Title>
        <Text c="dimmed">Manage your account settings and preferences</Text>
      </div>

      {/* Segmented Control */}
      <SegmentedControl
        fullWidth
        size="md"
        radius="xl"
        className="mx-auto"
        value={section}
        onChange={(val) => setSection(val as Section)}
        color="primary"
        classNames={{
          root: "bg-body",
          label: "group",
        }}
        data={[
          {
            value: "profile",
            label: (
              <div className="flex items-center justify-center gap-2">
                <User2 size={16} /> Profile
              </div>
            ),
          },
          {
            value: "notifications",
            label: (
              <div className="flex items-center justify-center gap-2">
                <Bell size={16} /> Notifications
              </div>
            ),
          },
          {
            value: "security",
            label: (
              <div className="flex items-center justify-center gap-2">
                <Shield size={16} /> Security
              </div>
            ),
          },
          {
            value: "preferences",
            label: (
              <div className="flex items-center justify-center gap-2">
                <SlidersHorizontal size={16} /> Preferences
              </div>
            ),
          },
          {
            value: "danger",
            label: (
              <div className="flex items-center justify-center gap-2 text-red-600 group-data-active:text-white">
                <Trash2 size={16} /> Danger
              </div>
            ),
          },
        ]}
      />

      {/* Panels */}
      <div>
        {section === "profile" && (
          <Card shadow="sm" radius="xl" className="p-6 items-center max-w-3xl mx-auto">
            {isPending ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading user data</div>
            ) : (
              <UpdateUserProfileForm user={user} />
            )}
          </Card>
        )}

        {section === "notifications" && (
          <Card shadow="sm" radius="xl" className="p-6 max-w-3xl mx-auto">
            <Stack gap="xl">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Email Notifications</Text>
                  <Text size="sm" c="dimmed">
                    Get important updates by email
                  </Text>
                </div>
                <Switch
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.currentTarget.checked)}
                />
              </Group>
              <Divider />
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Push Notifications</Text>
                  <Text size="sm" c="dimmed">
                    Receive alerts on your device
                  </Text>
                </div>
                <Switch
                  checked={pushNotif}
                  onChange={(e) => setPushNotif(e.currentTarget.checked)}
                />
              </Group>
            </Stack>
          </Card>
        )}

        {section === "security" && (
          <Card shadow="sm" radius="xl" className="p-6 max-w-3xl mx-auto">
            <Stack gap="md">
              <Text fw={500} className="flex items-center gap-2">
                <Lock size={18} /> Password
              </Text>
              <Text size="sm" c="dimmed">
                For security reasons, you can reset your password from the forgot-password page.
              </Text>
              <Button radius="lg" onClick={() => navigate("/forgot-password")}>
                Reset Password
              </Button>
              <Divider />
              <Button variant="outline" radius="lg">
                Enable Two-Factor Authentication
              </Button>
            </Stack>
          </Card>
        )}

        {section === "preferences" && (
          <Card shadow="sm" radius="xl" className="p-6">
            <Stack gap="md">
              <Text c="dimmed">Theme settings (coming soon…)</Text>
              <Text c="dimmed">Language settings (coming soon…)</Text>
            </Stack>
          </Card>
        )}

        {section === "danger" && (
          <Card
            shadow="sm"
            radius="xl"
            className="p-6 border border-red-300 dark:border-red-600 max-w-3xl mx-auto"
          >
            <Stack gap="md">
              <Text c="red" fw={600}>
                Danger Zone
              </Text>
              <Text size="sm" c="dimmed">
                Deleting your account is permanent and cannot be undone.
              </Text>
              <Button color="red" radius="lg">
                Delete Account
              </Button>
            </Stack>
          </Card>
        )}
      </div>
    </div>
  );
}
