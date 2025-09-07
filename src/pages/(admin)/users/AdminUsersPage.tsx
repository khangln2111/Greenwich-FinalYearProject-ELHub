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
import { IconFilterCog } from "@tabler/icons-react";
import dayjs from "dayjs";
import { PencilIcon, SearchIcon, ShieldQuestionIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { UserVm } from "../../../features/user/user.types";
import { useGetUsers, useSetUserActivation } from "../../../features/user/user.hooks";
import EditUserInfoModal from "./_c/EditUserInfoModal";
import EditUserRoleModal from "./_c/EditUserRoleModal";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function AdminUsersPage() {
  usePageSEO({ title: "User Management" });

  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);
  const [roleFilter, setRoleFilter] = useQueryState("role");
  const [statusFilter, setStatusFilter] = useQueryState("status");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));
  const [_, setSearchParams] = useSearchParams();

  const [editingUser, setEditingUser] = useState<UserVm | null>(null);
  const [editingRoleUser, setEditingRoleUser] = useState<UserVm | null>(null);
  const setActivation = useSetUserActivation();

  const handleEditUser = (user: UserVm) => setEditingUser(user);
  const handleEditRole = (user: UserVm) => setEditingRoleUser(user);
  const handleToggleActivation = (userId: string, isCurrentlyActive: boolean) => {
    setActivation.mutate({ userId, isActive: !isCurrentlyActive });
  };

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput.trim());
  };

  const { data, isPending, error } = useGetUsers({
    search: search,
    role: roleFilter,
    isActivated: statusFilter === "Active" ? true : statusFilter === "Banned" ? false : undefined,
    page,
    pageSize,
  });

  if (error) {
    return (
      <Text c="red" ta="center">
        Error loading users: {error.message}
      </Text>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8 space-y-6">
      <Title order={1} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        User Management
      </Title>

      <Card shadow="sm" radius="md" withBorder>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <TextInput
            placeholder="Search by name or email"
            label="Search Users"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(searchInput);
              }
            }}
            rightSection={
              search ? (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setSearchInput("");
                    setSearch(null);
                  }}
                >
                  ✕
                </ActionIcon>
              ) : (
                <ActionIcon type="submit" variant="subtle" size="lg" onClick={handleSearchSubmit}>
                  <SearchIcon className="text-gray-500" size={16} />
                </ActionIcon>
              )
            }
            className="w-full lg:max-w-[400px]"
          />

          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start items-end lg:justify-end">
            <Select
              data={["Student", "Instructor", "Admin"]}
              placeholder="Role"
              checkIconPosition="right"
              clearable
              label="Filter by Role"
              value={roleFilter}
              onChange={(val) => setRoleFilter(val)}
              className="flex-1 min-w-[130px] sm:min-w-[150px]"
            />
            <Select
              data={["Active", "Banned"]}
              placeholder="Status"
              checkIconPosition="right"
              label="Filter by Status"
              clearable
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              className="flex-1 min-w-[130px] sm:min-w-[150px]"
            />
            <Button
              variant="light"
              leftSection={<IconFilterCog size={16} />}
              onClick={() => {
                setSearchParams(new URLSearchParams());
                setSearchInput("");
              }}
            >
              Reset Filters
            </Button>
          </div>
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
                {isPending ? (
                  <Table.Tr>
                    <Table.Td colSpan={5} className="text-center">
                      <CenterLoader height={200} />
                    </Table.Td>
                  </Table.Tr>
                ) : data?.items.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5} className="text-center">
                      <div className="min-h-[200px] grid place-content-center">
                        <Text ta="center" c="dimmed" mt="md">
                          No users found.
                        </Text>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  data?.items.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>
                        <div className="flex items-center gap-x-4 whitespace-nowrap">
                          <Avatar
                            src={user.avatarUrl}
                            radius="xl"
                            size="md"
                            color="initials"
                            name={user.fullName ?? undefined}
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
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Badge
                            variant="light"
                            color="gray"
                            className="text-[13px] px-2 text-center w-fit"
                          >
                            Learner
                          </Badge>
                          {user.roles.length > 0 &&
                            user.roles.map((role: string) => (
                              <Badge
                                key={role}
                                variant="light"
                                className="text-[13px] px-2 text-center w-fit"
                                color={
                                  role === "Admin" ? "red" : role === "Instructor" ? "blue" : "gray"
                                }
                              >
                                {role}
                              </Badge>
                            ))}
                        </div>
                      </Table.Td>

                      <Table.Td>
                        <Switch
                          size="sm"
                          color="green"
                          checked={user.isActivated}
                          label={user.isActivated ? "Active" : "Banned"}
                          onChange={() => handleToggleActivation(user.id, user.isActivated)}
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
                  ))
                )}
              </Table.Tbody>
            </Table>
          </TableScrollContainer>
          <AppPagination
            page={page}
            pageSize={pageSize}
            itemsCount={data?.count ?? 0}
            onPageChange={setPage}
            withEdges
            className="my-3 flex items-center justify-center"
          />
        </div>
      </Card>

      {editingUser && (
        <EditUserInfoModal
          opened={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
        />
      )}

      {editingRoleUser && (
        <EditUserRoleModal
          opened={!!editingRoleUser}
          onClose={() => setEditingRoleUser(null)}
          user={editingRoleUser}
        />
      )}
    </div>
  );
}
