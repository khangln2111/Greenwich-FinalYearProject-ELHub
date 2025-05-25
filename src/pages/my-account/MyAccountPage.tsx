import { Avatar, Button, Group, Radio, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCamera } from "@tabler/icons-react";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function MyAccountPage() {
  const [fullName, setFullName] = useState("Khang");
  const [email, setEmail] = useState("lenguyenkhang21112003@gmail.com");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  return (
    <div>
      <Title order={2} className="mb-3">
        Personal Information
      </Title>
      <div className="w-full px-4 bg-body rounded-md border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="rounded-xl max-w-(--container-md) mx-auto px-2 py-4 md:py-10">
          <div className="flex flex-col items-center gap-2 mb-6">
            <Avatar size={100} radius="full" />
            <Button
              variant="subtle"
              color="blue"
              leftSection={<IconCamera size={16} />}
              className="text-sm"
            >
              Change profile photo
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid items-center grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                placeholder="Enter your first name"
                size="md"
                required
              />
              <TextInput
                label="Last Name"
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                placeholder="Enter your last name"
                size="md"
                required
              />
            </div>
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter your email"
              disabled
              size="md"
            />
            <div>
              <label className="font-medium block mb-1">Gender</label>
              <Radio.Group value={gender} onChange={setGender} size="md" variant="outline">
                <Group gap="md">
                  <Radio value="male" label="Male" variant="outline" />
                  <Radio value="female" label="Female" variant="outline" />
                </Group>
              </Radio.Group>
            </div>
            <div>
              <DateInput
                value={dateOfBirth}
                label="Date of Birth"
                onChange={setDateOfBirth}
                rightSection={<CalendarIcon size={16} />}
                placeholder="Birth date"
                size="md"
                pointer={true}
                valueFormat="DD/MM/YYYY"
                className="w-full"
                maxDate={new Date()}
              />
            </div>
          </div>
          <Button fullWidth className="mt-6 text-white" radius="md" size="md">
            Update Information
          </Button>
        </div>
      </div>
    </div>
  );
}
