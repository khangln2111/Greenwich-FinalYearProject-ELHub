import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  Title,
  TableScrollContainer,
} from "@mantine/core";
import { useState } from "react";
import { Search, EyeIcon, BanIcon, ShieldCheckIcon } from "lucide-react";
import dayjs from "dayjs";

const mockUsers = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User${i + 1}`,
  role: i % 5 === 0 ? "Admin" : i % 4 === 0 ? "Instructor" : "Student",
  status: i % 6 === 0 ? "Banned" : "Active",
  joinedAt: dayjs()
    .subtract(i * 3, "days")
    .toISOString(),
}));

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex-1 p-6 xl:p-8 space-y-6">
      <Title order={2}>User Management</Title>

      <Card shadow="sm" radius="md" withBorder>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TextInput
            placeholder="Search by name or email"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="w-full md:max-w-(--container-sm)"
          />

          <Group className="flex-wrap gap-2" justify="end">
            <Select
              data={["Student", "Instructor", "Admin"]}
              placeholder="Role"
              clearable
              value={roleFilter}
              onChange={setRoleFilter}
              className="w-[150px]"
            />
            <Select
              data={["Active", "Banned"]}
              placeholder="Status"
              clearable
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-[150px]"
            />
          </Group>
        </div>

        <TableScrollContainer minWidth={500}>
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Joined</Table.Th>
                <Table.Th className="text-right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredUsers.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Group>
                      <Avatar src={user.avatar} radius="xl" />
                      <div>
                        <Text size="sm" fw={500}>
                          {user.name}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {user.email}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      color={
                        user.role === "Admin" ? "red" : user.role === "Instructor" ? "blue" : "gray"
                      }
                    >
                      {user.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="dot" color={user.status === "Banned" ? "gray" : "green"}>
                      {user.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{dayjs(user.joinedAt).format("DD/MM/YYYY")}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="end" gap="xs">
                      <Button
                        size="xs"
                        variant="subtle"
                        color="blue"
                        leftSection={<EyeIcon size={14} />}
                      >
                        View
                      </Button>
                      {user.status === "Active" ? (
                        <Button
                          size="xs"
                          variant="light"
                          color="red"
                          leftSection={<BanIcon size={14} />}
                        >
                          Ban
                        </Button>
                      ) : (
                        <Button
                          size="xs"
                          variant="light"
                          color="green"
                          leftSection={<ShieldCheckIcon size={14} />}
                        >
                          Unban
                        </Button>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>

        {filteredUsers.length === 0 && (
          <Text ta="center" c="dimmed" mt="md">
            No users found.
          </Text>
        )}
      </Card>
    </div>
  );
}
