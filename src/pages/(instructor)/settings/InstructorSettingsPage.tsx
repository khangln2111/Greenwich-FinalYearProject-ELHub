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
  TextInput,
  Title,
} from "@mantine/core";
import {
  Globe,
  LockIcon,
  Monitor,
  Moon,
  Shield,
  SlidersHorizontal,
  Sun,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetWorkProfileSelf } from "../../../features/auth/identity.hooks";
import UpdateWorkProfileForm from "../profile/UpdateWorkProfileForm";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { usePageSEO } from "../../../hooks/usePageSEO";

enum Tabs {
  Profile = "Profile",
  Notifications = "Notifications",
  Preferences = "Preferences",
  Payments = "Payments",
  Security = "Security",
}

export default function InstructorSettingsPage() {
  usePageSEO({ title: "Settings" });

  const { data, isPending, error } = useGetWorkProfileSelf();

  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringEnum(Object.values(Tabs)).withDefault(Tabs.Profile),
  );
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="text-center sm:text-left space-y-2 mb-6">
        <Title
          order={1}
          className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          Settings
        </Title>
        <Text c="dimmed">Manage your account settings and preferences</Text>
      </div>

      <div className="overflow-x-auto mx-auto mb-10 shadow-sm rounded-full">
        <SegmentedControl
          fullWidth
          radius="full"
          size="md"
          className="min-w-max bg-body border"
          value={tab}
          onChange={(val) => setTab(val as Tabs)}
          color="primary"
          data={Object.values(Tabs)}
        />
      </div>

      {/* Profile */}
      {tab === Tabs.Profile && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto bg-body">
          {isPending ? (
            <CenterLoader />
          ) : error ? (
            <div className="text-red-600">Failed to load profile. Please try again later.</div>
          ) : (
            data && <UpdateWorkProfileForm profile={data} />
          )}
        </Card>
      )}

      {/* Payments */}
      {tab === Tabs.Payments && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto bg-body">
          <Stack gap="lg">
            <Text fw={500} className="flex items-center gap-2 text-lg">
              <Wallet size={18} /> Payment & Payouts
            </Text>
            <Select
              label="Preferred Payout Method"
              checkIconPosition="right"
              defaultValue="stripe"
              data={[
                { value: "bank", label: "Bank Transfer" },
                { value: "paypal", label: "PayPal" },
                { value: "stripe", label: "Stripe" },
              ]}
              radius="lg"
            />
            <TextInput
              label="Account / Email"
              placeholder="Enter your payout account"
              radius="lg"
            />
            <Group justify="flex-end">
              <Button radius="lg">Update Payout Info</Button>
            </Group>
          </Stack>
        </Card>
      )}

      {/* Notifications */}
      {tab === Tabs.Notifications && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto bg-body">
          <Stack gap="xl">
            {/* Sales */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Course Sales</Text>
                <Text size="sm" c="dimmed">
                  Get notified when a student purchases your course
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Student questions */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Student Questions</Text>
                <Text size="sm" c="dimmed">
                  Receive alerts when students ask questions in your courses
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Payout updates */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Payout Status Updates</Text>
                <Text size="sm" c="dimmed">
                  Notifications when your payouts are processed or delayed
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* System alerts */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>System Alerts</Text>
                <Text size="sm" c="dimmed">
                  Important platform-wide announcements and incidents
                </Text>
              </div>
              <Switch defaultChecked />
            </Group>
            <Divider />

            {/* Weekly digest */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500}>Weekly Digest</Text>
                <Text size="sm" c="dimmed">
                  A summary of your teaching performance every week
                </Text>
              </div>
              <Switch defaultChecked={false} />
            </Group>
          </Stack>
        </Card>
      )}

      {/* Preferences */}
      {tab === Tabs.Preferences && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto bg-body">
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
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto bg-body">
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
    </div>
  );
}
