import { Button } from "@mantine/core";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import CusModal from "../../../../components/CusModal/CusModal";

type Props = {
  opened: boolean;
  onClose: () => void;
  type: "pending" | "rejected-wait" | "approved";
  note?: string; // thêm props note
};

const statusMap = {
  pending: {
    icon: <Clock className="text-yellow-500 w-10 h-10" />,
    title: "Application Under Review",
    message:
      "Thank you for applying! Your instructor application is currently being reviewed. We’ll notify you once a decision has been made.",
  },
  "rejected-wait": {
    icon: <XCircle className="text-red-500 w-10 h-10" />,
    title: "You Can't Apply Yet",
    message: "Your application was rejected. Please wait at least 2 days before reapplying.",
  },
  approved: {
    icon: <CheckCircle className="text-green-600 w-10 h-10" />,
    title: "You’re Already an Instructor!",
    message:
      "Welcome back! You already have instructor access. Head over to your dashboard to manage your courses.",
  },
};

const ApplicationStatusModal = ({ opened, onClose, type, note }: Props) => {
  const status = statusMap[type];

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      size="500px"
      classNames={{
        header: "border-b-0",
        body: "pt-0",
      }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {status.icon}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{status.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{status.message}</p>

        {type === "rejected-wait" && note && (
          <div
            className="bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded p-4 w-full text-sm
              text-red-700 dark:text-red-300"
          >
            <strong>Rejection Reason:</strong>
            <p className="mt-1 whitespace-pre-line">{note}</p>
          </div>
        )}

        <Button onClick={onClose}>Got it</Button>
      </div>
    </CusModal>
  );
};

export default ApplicationStatusModal;
