import { Box, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

export function PasswordRequirement({ meets, label }: PasswordRequirementProps) {
  return (
    <Text c={meets ? "teal" : "red"} className="flex items-center" mt={7} size="sm">
      {meets ? <IconCheck className="size-[14px]" /> : <IconX className="size-[14px]" />}
      <Box component="span" ml={10}>
        {label}
      </Box>
    </Text>
  );
}
