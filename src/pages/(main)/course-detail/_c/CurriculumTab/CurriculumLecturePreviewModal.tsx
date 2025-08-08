import { Modal } from "@mantine/core";
import ReactPlayer from "react-player";

type CurriculumLecturePreviewModalProps = {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
};

const CurriculumLecturePreviewModal = ({
  opened,
  onClose,
  videoUrl,
}: CurriculumLecturePreviewModalProps) => {
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

export default CurriculumLecturePreviewModal;
