import { Paper, ThemeIcon, Text } from "@mantine/core";
import { InfoIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type EmptyInformationProps = {
  message: string;
  icon?: React.ReactNode;
  classNames?: {
    root?: string;
    icon?: string;
    message?: string;
  };
};

const EmptyInformation = ({
  message,
  icon = <InfoIcon size={18} />,
  classNames,
}: EmptyInformationProps) => (
  <Paper
    p="md"
    radius="md"
    className={cn(
      `flex items-center gap-3 bg-gray-50 dark:bg-dark-6 border border-dashed border-gray-300
      dark:border-gray-700`,
      classNames?.root,
    )}
  >
    <ThemeIcon variant="light" color="gray" radius="xl" className={cn(classNames?.icon)}>
      {icon}
    </ThemeIcon>
    <Text size="md" c="dimmed" className={cn(classNames?.message)}>
      {message}
    </Text>
  </Paper>
);

export default EmptyInformation;
