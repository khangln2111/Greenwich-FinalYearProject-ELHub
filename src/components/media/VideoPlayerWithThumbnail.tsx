import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { extractThumbnailFromVideoUrl } from "../../utils/form";
import { cn } from "../../utils/cn";
import { Loader } from "@mantine/core";

type VideoPlayerWithThumbnailProps = {
  videoUrl: string;
  className?: string;
  classNames?: {
    playIconWrapper?: string;
    playIcon?: string;
  };
  previewThumbnailUrl?: string;
};

export default function VideoPlayerWithThumbnail({
  videoUrl,
  className,
  classNames,
  previewThumbnailUrl,
}: VideoPlayerWithThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(previewThumbnailUrl ?? null);
  const [thumbnailLoading, setThumbnailLoading] = useState(!previewThumbnailUrl);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (previewThumbnailUrl) {
      setThumbnail(previewThumbnailUrl);
      setThumbnailLoading(false);
      return;
    }

    if (videoUrl) {
      setThumbnailLoading(true);
      extractThumbnailFromVideoUrl(videoUrl)
        .then((thumb) => {
          setThumbnail(thumb);
          setThumbnailLoading(false);
        })
        .catch((e) => {
          console.error("Thumbnail generation failed:", e);
          setThumbnail(null);
          setThumbnailLoading(false);
        });
    }
  }, [videoUrl, previewThumbnailUrl]);

  return (
    <div className={cn("relative size-full object-cover", className)}>
      <ReactPlayer
        key={videoUrl}
        url={videoUrl}
        width="100%"
        height="100%"
        style={{ maxHeight: "100%", objectFit: "cover" }}
        controls
        playing={playing}
        onClickPreview={() => setPlaying(true)}
        light={thumbnail || <div className="bg-black size-full" />}
        playIcon={
          thumbnailLoading ? (
            <Loader className="absolute" />
          ) : (
            <span className={cn("absolute flex size-12", classNames?.playIconWrapper)}>
              <span className="animate-ping absolute size-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full size-full bg-blue-500 items-center justify-center">
                <Play className={cn("text-white size-6", classNames?.playIcon)} />
              </span>
            </span>
          )
        }
      />
    </div>
  );
}
