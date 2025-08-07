import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../zustand/store";
import { useDisclosure } from "@mantine/hooks";
import CreateInstructorApplicationForm from "./CreateInstructorApplicationForm";
import RetryInstructorApplicationForm from "./RetryInstructorApplicationForm";
import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import { useGetInstructorApplicationSelf } from "../../../features/instructorApplication/instructorApplicationHooks";
import CusModal from "../../../components/CusModal";
import ApplicationStatusModal from "./ApplicationStatusModal"; // import thêm modal đẹp mắt
import { useState } from "react";
import { InstructorApplicationStatus } from "../../../features/instructorApplication/instructorApplication.types";

const MAX_RETRY = 2;
const RETRY_DELAY_DAYS = 7;

const BecomeInstructorCTA = () => {
  const navigate = useNavigate();
  const currentUser = useAppStore.use.currentUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [statusModal, { open: openStatusModal, close: closeStatusModal }] = useDisclosure(false);
  const [statusType, setStatusType] = useState<"pending" | "rejected-wait" | "approved" | null>(
    null,
  );

  const { data: application, isLoading } = useGetInstructorApplicationSelf();

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/become-an-instructor" } });
      return;
    }

    if (currentUser.roles.includes("Instructor")) {
      navigate("/instructor/dashboard");
      return;
    }

    if (!application) {
      open(); // mở form tạo mới
      return;
    }

    if (application.status === InstructorApplicationStatus.Pending) {
      setStatusType("pending");
      openStatusModal();
      return;
    }

    if (application.status === InstructorApplicationStatus.Approved) {
      setStatusType("approved");
      openStatusModal();
      return;
    }

    if (application.status === InstructorApplicationStatus.Rejected) {
      const canRetry =
        application.retryCount < MAX_RETRY &&
        (!application.lastRejectedAt ||
          dayjs().diff(dayjs(application.lastRejectedAt), "day") >= RETRY_DELAY_DAYS);

      if (canRetry) {
        open(); // mở form retry
      } else {
        setStatusType("rejected-wait");
        openStatusModal();
      }

      return;
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
      <div className="mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Become an Instructor Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[768px]">
          Join one of the world’s largest online learning marketplaces. Our Instructor Support Team
          is ready to help you while our Teaching Center guides your journey.
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors"
        >
          Get started now
        </button>
      </div>

      <CusModal opened={opened} onClose={close} title="Instructor Application" size="700px">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader />
          </div>
        ) : application?.status === "Rejected" ? (
          <RetryInstructorApplicationForm onCancel={close} application={application} />
        ) : (
          <CreateInstructorApplicationForm onCancel={close} />
        )}
      </CusModal>

      {statusType && (
        <ApplicationStatusModal
          opened={statusModal}
          onClose={() => {
            closeStatusModal();
            setStatusType(null);
          }}
          type={statusType}
          note={application?.note}
        />
      )}
    </section>
  );
};

export default BecomeInstructorCTA;
