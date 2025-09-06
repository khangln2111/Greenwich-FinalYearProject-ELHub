import {
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import {
  Bell,
  Globe,
  LockIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  Shield,
  SlidersHorizontal,
  SunIcon,
  Trash2,
  User2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserInfo } from "../../../features/auth/identity.hooks";
import UpdateUserProfileForm from "../my-account/_c/UpdateUserProfileForm";

type Section = "profile" | "notifications" | "security" | "preferences" | "danger";

export default function UserSettingsPage() {
  const [section, setSection] = useState<Section>("notifications");
  const { data: user, isPending, error } = useGetCurrentUserInfo();

  // Notification states
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [marketingNotif, setMarketingNotif] = useState(false);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Preferences states
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  const navigate = useNavigate();

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Title
          order={1}
          className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          Settings
        </Title>
        <Text c="dimmed">Manage your account settings and preferences</Text>
      </div>

      {/* Segmented Control */}
      <div className="overflow-x-auto mx-auto shadow-md rounded-xl">
        <SegmentedControl
          fullWidth
          size="md"
          radius="xl"
          value={section}
          onChange={(val) => setSection(val as Section)}
          color="primary"
          classNames={{
            root: "bg-body min-w-max",
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
      </div>

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
              {/* Email notifications */}
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

              {/* Push notifications */}
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
              <Divider />

              {/* Marketing */}
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Marketing Emails</Text>
                  <Text size="sm" c="dimmed">
                    Receive promotions, special offers and news
                  </Text>
                </div>
                <Switch
                  checked={marketingNotif}
                  onChange={(e) => setMarketingNotif(e.currentTarget.checked)}
                />
              </Group>
              <Divider />

              {/* Course updates */}
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Course Updates</Text>
                  <Text size="sm" c="dimmed">
                    Get notified when new lessons are added to your enrolled courses
                  </Text>
                </div>
                <Switch
                  checked={courseUpdates}
                  onChange={(e) => setCourseUpdates(e.currentTarget.checked)}
                />
              </Group>
              <Divider />

              {/* System alerts */}
              <Group justify="space-between">
                <div>
                  <Text fw={500}>System Alerts</Text>
                  <Text size="sm" c="dimmed">
                    Important system-wide announcements
                  </Text>
                </div>
                <Switch
                  checked={systemAlerts}
                  onChange={(e) => setSystemAlerts(e.currentTarget.checked)}
                />
              </Group>
              <Divider />

              {/* Weekly digest */}
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Weekly Digest</Text>
                  <Text size="sm" c="dimmed">
                    A summary of your activity every week
                  </Text>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.currentTarget.checked)}
                />
              </Group>
            </Stack>
          </Card>
        )}

        {section === "security" && (
          <Card shadow="sm" radius="xl" className="p-6 max-w-3xl mx-auto">
            <Stack gap="lg">
              <Text fw={500} className="flex items-center gap-2 text-lg">
                <LockIcon size={18} /> Password
              </Text>
              <Text className="text-md" c="dimmed">
                For security reasons, you can reset your password from the forgot-password page.
              </Text>
              <Group gap="md" className="justify-start">
                <Button
                  radius="lg"
                  leftSection={<LockIcon size={16} />}
                  onClick={() => navigate("/forgot-password")}
                >
                  Reset Password
                </Button>
                <Button variant="outline" radius="lg" leftSection={<Shield size={16} />}>
                  Enable Two-Factor Auth
                </Button>
              </Group>
            </Stack>
          </Card>
        )}

        {section === "preferences" && (
          <Card shadow="sm" radius="xl" className="p-6 max-w-3xl mx-auto">
            <Stack gap="lg">
              {/* Theme */}
              <div>
                <Text fw={500} className="mb-2 flex items-center gap-2">
                  <PaletteIcon size={16} /> Theme
                </Text>
                <SegmentedControl
                  value={theme}
                  onChange={setTheme}
                  radius="lg"
                  data={[
                    {
                      value: "light",
                      label: (
                        <div className="flex items-center gap-2">
                          <SunIcon size={16} /> Light
                        </div>
                      ),
                    },
                    {
                      value: "dark",
                      label: (
                        <div className="flex items-center gap-2">
                          <MoonIcon size={16} /> Dark
                        </div>
                      ),
                    },
                    {
                      value: "system",
                      label: (
                        <div className="flex items-center gap-2">
                          <MonitorIcon size={16} /> System
                        </div>
                      ),
                    },
                  ]}
                />
              </div>

              <Divider />

              {/* Language */}
              <div>
                <Text fw={500} className="mb-2 flex items-center gap-2">
                  <Globe size={16} /> Language
                </Text>
                <Select
                  value={language}
                  onChange={(val) => setLanguage(val || "en")}
                  data={[
                    { value: "en", label: "English" },
                    { value: "vi", label: "Tiếng Việt" },
                    { value: "es", label: "Español" },
                    { value: "fr", label: "Français" },
                  ]}
                  className="max-w-xs"
                  radius="lg"
                />
              </div>
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
