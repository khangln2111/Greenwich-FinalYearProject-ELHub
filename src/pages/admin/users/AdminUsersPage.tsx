import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Select,
  Switch,
  Table,
  TableScrollContainer,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";
import { PencilIcon, Search } from "lucide-react";
import { useState } from "react";

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
  const [users, setUsers] = useState(mockUsers);

  const handleToggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Banned" : "Active",
            }
          : user,
      ),
    );
  };

  const handleChangeRole = (id: number, newRole: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
  };

  const openEditRoleModal = (user: (typeof users)[number]) => {
    let selectedRole = user.role;

    modals.open({
      title: `Edit role for ${user.name}`,
      children: (
        <div className="space-y-4">
          <Select
            label="Select Role"
            data={["Student", "Instructor", "Admin"]}
            defaultValue={user.role}
            onChange={(value) => {
              if (value) selectedRole = value;
            }}
          />
          <Group justify="end" mt="md">
            <Button variant="default" onClick={() => modals.closeAll()}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleChangeRole(user.id, selectedRole);
                modals.closeAll();
              }}
            >
              Confirm
            </Button>
          </Group>
        </div>
      ),
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8 space-y-6">
      <Title order={2}>User Management</Title>

      <Card shadow="sm" radius="md" withBorder>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <TextInput
            placeholder="Search by name or email"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="w-full lg:max-w-[400px]"
          />

          <Group className="flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
            <Select
              data={["Student", "Instructor", "Admin"]}
              placeholder="Role"
              clearable
              value={roleFilter}
              onChange={setRoleFilter}
              className="flex-1 min-w-[130px] sm:min-w-[150px]"
            />
            <Select
              data={["Active", "Banned"]}
              placeholder="Status"
              clearable
              value={statusFilter}
              onChange={setStatusFilter}
              className="flex-1 min-w-[130px] sm:min-w-[150px]"
            />
          </Group>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <TableScrollContainer minWidth={600}>
            <Table striped highlightOnHover stickyHeader horizontalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User Info</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Birthdate</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      <div className="flex items-center gap-x-4 whitespace-nowrap">
                        <Avatar src={user.avatar} radius="xl" size="md" />
                        <div className="flex flex-col">
                          <Text size="md" fw={600} className="text-gray-900 dark:text-gray-100">
                            {user.name}
                          </Text>
                          <Text size="sm" className="text-gray-600 dark:text-gray-400 break-all">
                            {user.email}
                          </Text>
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        variant="light"
                        className="min-w-[120px] text-center text-[13px] px-2"
                        color={
                          user.role === "Admin"
                            ? "red"
                            : user.role === "Instructor"
                              ? "blue"
                              : "gray"
                        }
                      >
                        {user.role}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Switch
                        size="sm"
                        color={user.status === "Banned" ? "gray" : "green"}
                        checked={user.status === "Active"}
                        onChange={() => handleToggleStatus(user.id)}
                        label={user.status}
                      />
                    </Table.Td>

                    <Table.Td>
                      <Text size="sm">{dayjs(user.joinedAt).format("DD/MM/YYYY")}</Text>
                    </Table.Td>

                    <Table.Td>
                      <Button
                        size="xs"
                        variant="subtle"
                        leftSection={<PencilIcon size={14} />}
                        onClick={() => openEditRoleModal(user)}
                      >
                        Edit
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </TableScrollContainer>
        </div>

        {filteredUsers.length === 0 && (
          <Text ta="center" c="dimmed" mt="md">
            No users found.
          </Text>
        )}
      </Card>
    </div>
  );
}
