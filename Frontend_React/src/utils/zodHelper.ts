import { ZodString } from "zod";

export function extractPasswordRequirements(schema: ZodString) {
  return schema._def.checks
    .map((check) => {
      switch (check.kind) {
        case "min":
          return {
            label: check.message || `At least ${check.value} characters`,
            validate: (value: string) => value.length >= check.value,
          };
        case "max":
          return {
            label: check.message || `No more than ${check.value} characters`,
            validate: (value: string) => value.length <= check.value,
          };
        case "regex":
          return {
            label: check.message || "Password pattern mismatch",
            validate: (value: string) => check.regex.test(value),
          };
        default:
          return null;
      }
    })
    .filter(Boolean) as { label: string; validate: (value: string) => boolean }[];
}
