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
  AlertTriangle,
  Globe,
  LockIcon,
  Monitor,
  Moon,
  Server,
  Shield,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";
import { parseAsStringEnum, useQueryState } from "nuqs";
import UpdateUserProfileForm from "../../(main)/my-account/_c/UpdateUserProfileForm";
import { usePageSEO } from "../../../hooks/usePageSEO";

enum Tabs {
  Profile = "Profile",
  Notifications = "Notifications",
  Preferences = "Preferences",
  Security = "Security",
  System = "System",
}

export default function AdminSettingsPage() {
  usePageSEO({ title: "Admin Settings" });

  const { data: user, isPending, error } = useGetCurrentUser();

  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringEnum(Object.values(Tabs)).withDefault(Tabs.Profile),
  );
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [maintenance, setMaintenance] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 xl:p-8">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <Title
          order={1}
          className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          Admin Settings
        </Title>
        <Text c="dimmed">Manage system-wide settings and admin preferences</Text>
      </div>

      {/* Tabs navigator */}
      <div className="overflow-x-auto mx-auto mb-10 shadow-sm rounded-full">
        <SegmentedControl
          fullWidth
          radius="full"
          size="md"
          className="min-w-max p-2 bg-body border"
          value={tab}
          onChange={(val) => setTab(val as Tabs)}
          color="primary"
          data={Object.values(Tabs)}
        />
      </div>

      {/* Profile */}
      {tab === Tabs.Profile && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          {isPending ? (
            <CenterLoader />
          ) : error ? (
            <div className="text-red-600">Failed to load profile. Please try again later.</div>
          ) : (
            user && <UpdateUserProfileForm user={user} />
          )}
        </Card>
      )}

      {/* Notifications */}
      {tab === Tabs.Notifications && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="xl">
            {/* User reports */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>User Reports</Text>
                <Text size="sm" c="dimmed">
                  Get notified when users report inappropriate content
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* System errors */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>System Errors</Text>
                <Text size="sm" c="dimmed">
                  Receive alerts for backend errors and outages
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Security alerts */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Security Alerts</Text>
                <Text size="sm" c="dimmed">
                  Notifications about suspicious login attempts or attacks
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Weekly digest */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Weekly Admin Digest</Text>
                <Text size="sm" c="dimmed">
                  Summary of reports, user activity, and revenue each week
                </Text>
              </div>
              <Switch defaultChecked={false} />
            </Group>
          </Stack>
        </Card>
      )}

      {/* Preferences */}
      {tab === Tabs.Preferences && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="lg">
            {/* Theme */}
            <div>
              <Text fw={500} className="mb-2 flex items-center gap-2">
                <SlidersHorizontal size={16} /> Theme
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
                        <Sun size={16} /> Light
                      </div>
                    ),
                  },
                  {
                    value: "dark",
                    label: (
                      <div className="flex items-center gap-2">
                        <Moon size={16} /> Dark
                      </div>
                    ),
                  },
                  {
                    value: "system",
                    label: (
                      <div className="flex items-center gap-2">
                        <Monitor size={16} /> System
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

      {/* Security */}
      {tab === Tabs.Security && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="lg">
            <Text fw={500} className="flex items-center gap-2 text-lg">
              <Shield size={18} /> Security
            </Text>
            <Text c="dimmed">Reset your password via the forgot-password page.</Text>
            <Group gap="md">
              <Button
                radius="lg"
                leftSection={<LockIcon size={16} />}
                onClick={() => navigate("/forgot-password")}
                className="w-full sm:w-auto"
              >
                Reset Password
              </Button>
              <Button
                variant="outline"
                radius="lg"
                leftSection={<Shield size={16} />}
                className="w-full sm:w-auto"
              >
                Enable Two-Factor Auth
              </Button>
            </Group>
          </Stack>
        </Card>
      )}

      {/* System */}
      {tab === Tabs.System && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="lg">
            <Text fw={500} className="flex items-center gap-2 text-lg">
              <Server size={18} /> System Settings
            </Text>

            {/* Maintenance mode */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Maintenance Mode</Text>
                <Text size="sm" c="dimmed">
                  Temporarily take the platform offline for maintenance
                </Text>
              </div>
              <Switch
                checked={maintenance}
                onChange={(e) => setMaintenance(e.currentTarget.checked)}
              />
            </Group>
            <Divider />

            {/* Error logging */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Error Logging</Text>
                <Text size="sm" c="dimmed">
                  Enable detailed error logging for debugging
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Critical alerts */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Critical Alerts</Text>
                <Text size="sm" c="dimmed">
                  Get immediate notifications for severe incidents
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>

            <Group justify="flex-end">
              <Button color="red" leftSection={<AlertTriangle size={16} />} radius="lg">
                Save System Settings
              </Button>
            </Group>
          </Stack>
        </Card>
      )}
    </div>
  );
}
