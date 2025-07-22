import {
  ActionIcon,
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
import dayjs from "dayjs";
import { PencilIcon, Search, ShieldQuestionIcon } from "lucide-react";
import { useState } from "react";
import { useGetUsers } from "../../../react-query/user/userHooks";
import CenterLoader from "../../../components/CenterLoader";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data, isPending, error } = useGetUsers();

  if (isPending) return <CenterLoader />;

  if (error) {
    return (
      <Text c="red" ta="center">
        Error loading users: {error.message}
      </Text>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8 space-y-6">
      <Title order={2}>User Management</Title>

      <Card shadow="sm" radius="md" withBorder>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <TextInput
            placeholder="Search by name or email"
            label="Search Users"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="w-full lg:max-w-[400px]"
          />

          <Group className="flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
            <Select
              data={["Student", "Instructor", "Admin"]}
              placeholder="Role"
              checkIconPosition="right"
              clearable
              label="Filter by Role"
              value={roleFilter}
              onChange={setRoleFilter}
              className="flex-1 min-w-[130px] sm:min-w-[150px]"
            />
            <Select
              data={["Active", "Banned"]}
              placeholder="Status"
              checkIconPosition="right"
              clearable
              label="Filter by Status"
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
                {data?.items.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      <div className="flex items-center gap-x-4 whitespace-nowrap">
                        <Avatar
                          src={user.avatarUrl || user.fullName}
                          radius="xl"
                          size="md"
                          color="initials"
                        />
                        <div className="flex flex-col">
                          <Text size="md" fw={600} className="text-gray-900 dark:text-gray-100">
                            {user.fullName}
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
                          user.roles.includes("Admin")
                            ? "red"
                            : user.roles.includes("Instructor")
                              ? "blue"
                              : "gray"
                        }
                      >
                        {user.roles.join(", ") || "User"}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Switch
                        size="sm"
                        color={user.isActivated ? "green" : "gray"}
                        checked={user.isActivated}
                        label={user.isActivated ? "Active" : "Banned"}
                      />
                    </Table.Td>

                    <Table.Td>
                      <Text size="sm">
                        {user.dateOfBirth ? dayjs(user.dateOfBirth).format("DD/MM/YYYY") : "-"}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Button
                          size="xs"
                          variant="outline"
                          color="blue"
                          leftSection={<PencilIcon size={14} />}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="xs"
                          variant="outline"
                          color="gray"
                          leftSection={<ShieldQuestionIcon size={14} />}
                          onClick={() => handleEditRole(user)}
                        >
                          Role
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </TableScrollContainer>
        </div>

        {data?.count === 0 && (
          <Text ta="center" c="dimmed" mt="md">
            No users found.
          </Text>
        )}
      </Card>
    </div>
  );
}
