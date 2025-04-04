import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const showErrorToast = (title: string, message?: string) => {
  notifications.show({
    title,
    message: message || "An error occurred.",
    icon: <IconX size={20} />,
    color: "red",
  });
};

export const showSuccessToast = (title: string, message?: string) => {
  notifications.show({
    title,
    message: message || "Operation completed successfully.",
    icon: <IconCheck size={20} />,
    color: "green",
  });
};
