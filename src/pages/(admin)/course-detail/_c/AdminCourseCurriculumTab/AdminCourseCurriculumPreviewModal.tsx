import { Modal } from "@mantine/core";
import ReactPlayer from "react-player";

type AdminCourseCurriculumPreviewModalProps = {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
};

const AdminCourseCurriculumPreviewModal = ({
  opened,
  onClose,
  videoUrl,
}: AdminCourseCurriculumPreviewModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      classNames={{
        body: "p-0 overflow-hidden",
      }}
      centered
      size="xl"
      withCloseButton={false}
    >
      {videoUrl && <ReactPlayer url={videoUrl} width="100%" height="100%" controls playing />}
    </Modal>
  );
};

export default AdminCourseCurriculumPreviewModal;
