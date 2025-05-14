import { UseFormReturnType } from "@mantine/form";

/**
 * Wraps Mantine form's onSubmit to auto-focus the first invalid field.
 */
export function formSubmitWithFocus<TValues>(
  form: UseFormReturnType<TValues>,
  onValid: (values: TValues) => void,
) {
  return form.onSubmit(onValid, (errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.getInputNode(firstErrorPath)?.focus();
  });
}

export function extractThumbnailFromVideoUrl(videoUrl: string, seekTime = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");

    video.crossOrigin = "anonymous"; // Bắt buộc nếu video từ domain khác
    video.src = videoUrl;
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", () => {
      video.currentTime = seekTime;
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context error");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      resolve(imageUrl);
    });

    video.addEventListener("error", (e) => {
      reject("Failed to load video or CORS error");
    });
  });
}
