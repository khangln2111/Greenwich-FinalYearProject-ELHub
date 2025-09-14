import { Card, Group, Skeleton } from "@mantine/core";

export default function NotificationCardSkeleton() {
  return (
    <Card withBorder radius="lg" className="relative shadow-md p-4">
      <Group align="flex-start" wrap="nowrap" gap="md">
        {/* Icon placeholder */}
        <div className="relative shrink-0">
          <Skeleton circle height={48} width={48} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <Group gap="xs" mb={6} justify="space-between">
            <Skeleton height={20} width={120} radius="xl" />
          </Group>

          {/* Title */}
          <Skeleton height={18} width="70%" mb={6} />

          {/* Content */}
          <Skeleton height={14} width="90%" mb={4} />
          <Skeleton height={14} width="60%" mb={6} />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-2">
            <Skeleton height={12} width={100} />
            <Skeleton height={28} width={120} radius="xl" />
          </div>
        </div>
      </Group>
    </Card>
  );
}
