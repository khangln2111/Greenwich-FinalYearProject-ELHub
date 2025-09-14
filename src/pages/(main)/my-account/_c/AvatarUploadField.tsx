import { Avatar, Button, FileButton } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface AvatarUploadFieldProps {
  value?: File;
  defaultValue?: File;
  onChange?: (file: File) => void;
  previewUrl?: string | null;
  error?: string;
  accept?: string;
}

const AvatarUploadField = ({
  value,
  defaultValue,
  onChange,
  error,
  previewUrl,
  accept = "image/png,image/jpeg,image/jpg,image/webp",
}: AvatarUploadFieldProps) => {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(previewUrl ?? null);

  useEffect(() => {
    if (!value && previewUrl) {
      setPreviewMediaUrl(previewUrl);
    }
  }, [previewUrl, value]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      handleChange(file);
      setPreviewMediaUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar size={100} radius="xl" src={previewMediaUrl || undefined} />
      <FileButton accept={accept} onChange={handleFileSelect}>
        {(props) => (
          <Button
            variant="subtle"
            {...props}
            leftSection={<IconCamera size={16} />}
            className="text-sm"
          >
            Change profile photo
          </Button>
        )}
      </FileButton>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AvatarUploadField;
