import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { extractThumbnailFromVideoUrl } from "../../utils/form";
import { cn } from "../../utils/cn";
import { Loader } from "@mantine/core";

type VideoPlayerWithThumbnailProps = {
  videoUrl: string;
  className?: string;
};

export default function VideoPlayerWithThumbnail({
  videoUrl,
  className,
}: VideoPlayerWithThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
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
  }, [videoUrl]);

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
        light={thumbnail || <div className="bg-black size-full"></div>}
        playIcon={
          thumbnailLoading ? (
            <Loader className="absolute" />
          ) : (
            <span className="absolute flex size-12">
              <span className="animate-ping absolute h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full size-full bg-blue-500 items-center justify-center">
                <Play className="text-white size-6" />
              </span>
            </span>
          )
        }
      />
    </div>
  );
}
