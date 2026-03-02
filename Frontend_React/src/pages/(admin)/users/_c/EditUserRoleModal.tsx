import { Button, Checkbox, Group, Modal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAssignRolesToUser } from "../../../../features/user/user.hooks";
import { UserVm, AssignRoleToUserCommand } from "../../../../features/user/user.types";
import { RoleName } from "../../../../features/auth/identity.types";

interface Props {
  user: UserVm;
  opened: boolean;
  onClose: () => void;
}

const allRoles = [RoleName.Admin, RoleName.Instructor];

const EditUserRoleModal = ({ user, opened, onClose }: Props) => {
  const { mutate: assignRoles, isPending } = useAssignRolesToUser();

  const form = useForm<AssignRoleToUserCommand>({
    initialValues: {
      userId: user.id,
      roles: user.roles,
    },
  });

  const handleSubmit = (values: AssignRoleToUserCommand) => {
    assignRoles(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User Role" size="sm" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {allRoles.map((role) => (
            <Checkbox
              key={role}
              label={role}
              value={role}
              checked={form.values.roles.includes(role)}
              onChange={(event) => {
                const checked = event.currentTarget.checked;
                form.setFieldValue(
                  "roles",
                  checked
                    ? [...form.values.roles, role]
                    : form.values.roles.filter((r) => r !== role),
                );
              }}
            />
          ))}
        </Stack>

        <Group justify="end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save Roles
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditUserRoleModal;
