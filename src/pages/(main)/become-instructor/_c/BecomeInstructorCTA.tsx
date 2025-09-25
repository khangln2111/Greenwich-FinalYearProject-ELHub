import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import CenterLoader from "../../../../components/CenterLoader/CenterLoader";
import CusModal from "../../../../components/CusModal/CusModal";
import { useGetCurrentUser } from "../../../../features/auth/identity.hooks";
import { useGetInstructorApplicationSelf } from "../../../../features/instructorApplication/instructorApplication.hooks";
import { InstructorApplicationStatus } from "../../../../features/instructorApplication/instructorApplication.types";
import ApplicationStatusModal from "./ApplicationStatusModal";
import CreateInstructorApplicationForm from "./CreateInstructorApplicationForm";
import RetryInstructorApplicationForm from "./RetryInstructorApplicationForm";

const BecomeInstructorCTA = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();
  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [statusModal, { open: openStatusModal, close: closeStatusModal }] = useDisclosure(false);
  const [statusType, setStatusType] = useState<"pending" | "approved" | null>(null);

  const { data: application, isPending } = useGetInstructorApplicationSelf();

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/become-instructor" } });
      return;
    }

    if (currentUser.roles.includes("Instructor")) {
      navigate("/instructor/dashboard");
      return;
    }

    if (!application) {
      openFormModal(); // Create new
      return;
    }

    switch (application.status) {
      case InstructorApplicationStatus.Pending:
        setStatusType("pending");
        openStatusModal();
        break;
      case InstructorApplicationStatus.Approved:
        setStatusType("approved");
        openStatusModal();
        break;
      case InstructorApplicationStatus.Rejected:
        openFormModal();
        break;
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

      <CusModal
        opened={formModalOpened}
        onClose={closeFormModal}
        title="Instructor Application"
        size="700px"
      >
        {isPending ? (
          <div className="flex items-center justify-center py-10">
            <CenterLoader />
          </div>
        ) : application?.status === InstructorApplicationStatus.Rejected ? (
          <RetryInstructorApplicationForm onCancel={closeFormModal} application={application} />
        ) : (
          <CreateInstructorApplicationForm onCancel={closeFormModal} />
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
