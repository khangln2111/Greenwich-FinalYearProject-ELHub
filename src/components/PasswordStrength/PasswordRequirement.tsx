import { IconX, IconCheck } from "@tabler/icons-react";
import { Text, Box, rem } from "@mantine/core";

interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

export function PasswordRequirement({
  meets,
  label,
}: PasswordRequirementProps) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box component="span" ml={10}>
        {label}
      </Box>
    </Text>
  );
}
