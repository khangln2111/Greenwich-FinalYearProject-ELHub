import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BellRingIcon } from "lucide-react";
import ms from "ms";
import { ReactNode } from "react";

export const showErrorToast = (title: string, message?: string | ReactNode) => {
  notifications.show({
    title,
    message: message || "An error occurred.",
    icon: <IconX size={20} />,
    autoClose: ms("10s"),
    color: "red",
    withBorder: true,
    position: "bottom-right",
  });
};

export const showSuccessToast = (title: string, message?: string | ReactNode) => {
  notifications.show({
    title,
    message: message || "Operation completed successfully.",
    icon: <IconCheck size={20} />,
    color: "green",
    withBorder: true,
    position: "bottom-right",
  });
};

export const showLoadingToast = (title?: string, message?: string | ReactNode) => {
  const id = notifications.show({
    title: title || "Performing action",
    message: message || "Please wait...",
    loading: true,
    withBorder: true,
    position: "bottom-right",
    autoClose: false,
  });

  return id; // Used to update or dismiss later
};

export const showNotificationToast = (
  title: string = "New Notification!",
  message?: string | ReactNode,
) => {
  notifications.show({
    title,
    message: message || "You have a new notification.",
    icon: <BellRingIcon size={20} />,
    color: "orange",
    withBorder: true,
    position: "bottom-right",
  });
};
