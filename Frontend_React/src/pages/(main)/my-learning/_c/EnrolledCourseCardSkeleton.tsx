import { Card, Skeleton, Group, Stack } from "@mantine/core";

const EnrolledCourseCardSkeleton = () => {
  return (
    <Card
      radius="xl"
      shadow="sm"
      className="bg-body rounded-2xl shadow-sm overflow-hidden flex flex-col p-4"
    >
      {/* Image Section */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Content Section */}
      <Stack gap="md" className="flex-1 mt-4">
        {/* Title */}
        <Stack gap={6}>
          <Skeleton height={20} width="80%" />
          <Group gap="sm" align="center">
            <Skeleton circle height={28} width={28} />
            <Skeleton height={16} width="40%" />
          </Group>
        </Stack>

        {/* Progress */}
        <Stack gap={6}>
          <Group justify="space-between" align="center">
            <Skeleton height={14} width="20%" />
            <Skeleton height={14} width="12%" />
          </Group>
          <Skeleton height={12} radius="xl" />
        </Stack>

        {/* Footer: rating + button */}
        <Group justify="space-between" align="center" mt="xs">
          <Skeleton height={16} width={60} />
          <Skeleton height={32} width={140} radius="lg" />
        </Group>
      </Stack>
    </Card>
  );
};

export default EnrolledCourseCardSkeleton;
