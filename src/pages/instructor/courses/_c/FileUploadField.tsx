import { Dropzone } from "@mantine/dropzone";
import { Button } from "@mantine/core";
import { UploadIcon } from "lucide-react";
import { ReactNode, useRef } from "react";
import { useUncontrolled } from "@mantine/hooks";

interface FileUploadFieldProps {
  label: string;
  description?: string;
  error?: ReactNode;
  accept: Record<string, string[]>;
  value?: File;
  defaultValue?: File;
  onChange: (file: File) => void;
  preview?: ReactNode;
}

export default function FileUploadField({
  label,
  description,
  error,
  accept,
  value,
  defaultValue,
  onChange,
  preview,
}: FileUploadFieldProps) {
  const openRef = useRef<() => void>(null);

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  return (
    <div>
      <label className="block text-md font-medium mb-1">{label}</label>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64 h-36 border flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          {preview}
        </div>

        <div className="flex-1 space-y-2">
          {description && <p className="text-sm">{description}</p>}
          <Dropzone
            openRef={openRef}
            onDrop={(files) => {
              const file = files[0];
              if (file) handleChange(file);
            }}
            onReject={() => console.log("Invalid file")}
            multiple={false}
            accept={accept}
            p={0}
          >
            <div
              className={`border rounded-md px-4 py-2 grid grid-cols-[1fr_auto] items-center ${
                error ? "border-red-500" : "border-gray-300" }`}
            >
              <p className="text-sm truncate">{_value?.name ?? "No file selected"}</p>
              <Button
                variant="outline"
                size="xs"
                onClick={() => openRef.current?.()}
                leftSection={<UploadIcon className="w-4 h-4" />}
              >
                Upload
              </Button>
            </div>
          </Dropzone>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
