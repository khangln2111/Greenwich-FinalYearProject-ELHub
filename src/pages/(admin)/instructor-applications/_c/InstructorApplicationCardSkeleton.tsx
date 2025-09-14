import { Card, Group, Skeleton, Stack } from "@mantine/core";

const InstructorApplicationCardSkeleton = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      className="relative flex flex-col justify-between"
    >
      {/* Absolute badges */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
        <Skeleton height={22} width={70} radius="xl" />
        <Skeleton height={22} width={60} radius="xl" />
      </div>

      {/* Header: Avatar + Name + Email */}
      <Group gap="sm" wrap="nowrap">
        <Skeleton height={48} circle /> {/* avatar */}
        <div className="flex flex-col min-w-0 flex-1">
          <Skeleton height={14} width="60%" radius="sm" /> {/* name */}
          <Skeleton height={12} width="40%" radius="sm" className="mt-1" /> {/* email */}
        </div>
      </Group>

      {/* Body: Professional info */}
      <Stack mt="sm" gap={6}>
        <Skeleton height={12} width="80%" radius="sm" />
        <Skeleton height={36} radius="sm" /> {/* about lineClamp */}
        <Skeleton height={10} width="50%" radius="sm" />
        <Skeleton height={10} width="40%" radius="sm" />
      </Stack>

      {/* Actions */}
      <Skeleton height={28} radius="sm" mt="sm" />
    </Card>
  );
};

export default InstructorApplicationCardSkeleton;
