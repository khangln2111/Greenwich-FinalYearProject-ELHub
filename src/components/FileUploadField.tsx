import { Dropzone } from "@mantine/dropzone";
import { Button } from "@mantine/core";
import { ImageIcon, UploadIcon, VideoIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useUncontrolled } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { Accept } from "react-dropzone-esm";
interface FileUploadFieldProps {
  label: string;
  description?: string;
  error?: string;
  accept: string[] | Accept;
  value?: File;
  defaultValue?: File;
  onChange: (file: File) => void;
  preview?: string;
  previewMediaType: "image" | "video";
  maxSize?: number;
}

function MediaPreview({ url, type }: { url: string | null; type: "image" | "video" }) {
  if (url) {
    if (type === "image") {
      return <img src={url} alt="Preview" className="size-full object-cover" />;
    }
    if (type === "video") {
      return <video src={url} controls className="size-full object-cover" />;
    }

    return <span className="text-sm text-gray-400">Unsupported media type</span>;
  }

  if (type === "image") {
    return (
      <div className="flex flex-col items-center text-gray-400">
        <ImageIcon className="w-10 h-10 mb-1" />
        <span className="text-sm">No image selected</span>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="flex flex-col items-center text-gray-400">
        <VideoIcon className="w-10 h-10 mb-1" />
        <span className="text-sm">No video selected</span>
      </div>
    );
  }

  return <span className="text-sm text-gray-400">No preview available</span>;
}

export default function FileUploadField({
  label,
  description,
  error,
  accept,
  value,
  defaultValue,
  onChange,
  preview, // Optional preview
  previewMediaType,
  maxSize,
}: FileUploadFieldProps) {
  const openRef = useRef<() => void>(null);
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(preview ?? null);

  useEffect(() => {
    setPreviewMediaUrl(preview ?? null);
  }, [preview]);

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      handleChange(file);
      setPreviewMediaUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block text-md font-medium mb-1">{label}</label>
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className="w-full lg:w-64 h-36 border flex items-center justify-center bg-gray-50 dark:bg-gray-800
            overflow-hidden rounded-lg cursor-pointer"
          onClick={() => openRef.current?.()}
        >
          <MediaPreview url={previewMediaUrl} type={previewMediaType} />
        </div>

        <div className="flex-1 space-y-2">
          {description && <p className="text-sm">{description}</p>}
          <Dropzone
            openRef={openRef}
            onDrop={handleFileSelect}
            onReject={() => console.log("Invalid file")}
            multiple={false}
            accept={accept}
            maxSize={maxSize}
            p={0}
          >
            <div
              className={`border rounded-md px-4 py-2 size-full grid grid-cols-[1fr_auto] items-center ${
                error ? "border-red-500" : "border-gray-300" }`}
            >
              <p className="text-sm truncate">{_value?.name ?? "No file selected"}</p>
              <Button
                variant="outline"
                size="xs"
                onClick={() => openRef.current?.()}
                leftSection={<UploadIcon className="size-4" />}
              >
                Upload
              </Button>
              <Dropzone.Reject>
                <div className="flex justify-center items-center gap-xl mt-5">
                  <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-red-500">Invalid file type</p>
                    <p className="text-sm text-gray-500">
                      Accepted file types: {Object.values(accept).flat().join(", ")}
                    </p>
                  </div>
                </div>
              </Dropzone.Reject>
            </div>
          </Dropzone>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
