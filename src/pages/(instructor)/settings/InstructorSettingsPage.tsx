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
  Bell,
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
import { useNavigate } from "react-router-dom";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetWorkProfileSelf } from "../../../features/auth/identity.hooks";
import UpdateWorkProfileForm from "../profile/UpdateWorkProfileForm";

export default function InstructorSettingsPage() {
  const { data, isPending, error } = useGetWorkProfileSelf();

  const [section, setSection] = useState("profile");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-200 dark:bg-dark-5">
      <div className="space-y-2 mb-6">
        <Title
          order={1}
          className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          Settings
        </Title>
        <Text c="dimmed">Manage your account settings and preferences</Text>
      </div>

      <div className="overflow-x-auto mx-auto mb-10 shadow-md rounded-xl">
        <SegmentedControl
          fullWidth
          radius="xl"
          size="md"
          className="min-w-max bg-body"
          value={section}
          onChange={setSection}
          color="primary"
          data={[
            { label: "Profile", value: "profile" },
            { label: "Payments", value: "payments" },
            { label: "Notifications", value: "notifications" },
            { label: "Preferences", value: "preferences" },
            { label: "Security", value: "security" },
          ]}
        />
      </div>

      {/* Profile */}
      {section === "profile" && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
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
      {section === "payments" && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="lg">
            <Text fw={500} className="flex items-center gap-2 text-lg">
              <Wallet size={18} /> Payment & Payouts
            </Text>
            <Select
              label="Preferred Payout Method"
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
      {section === "notifications" && (
        <Card shadow="lg" withBorder radius="xl" className="p-6 max-w-3xl mx-auto">
          <Stack gap="lg">
            <Text fw={500} className="flex items-center gap-2 text-lg">
              <Bell size={18} /> Notifications
            </Text>
            <Switch label="Course sales" radius="lg" />
            <Switch label="New student questions" radius="lg" />
            <Switch label="Payout status updates" radius="lg" />
            <Group justify="flex-end">
              <Button radius="lg">Save Preferences</Button>
            </Group>
          </Stack>
        </Card>
      )}

      {/* Preferences */}
      {section === "preferences" && (
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
      {section === "security" && (
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
    </div>
  );
}
