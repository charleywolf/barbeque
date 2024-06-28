import { Dispatch, SetStateAction } from "react";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
} from "@tabler/icons-react";
import { pauseResume, skip } from "@/lib/actions/controls";

export default function Controls({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}) {
  const handleStopStart = async () => {
    const status = await pauseResume(isPlaying);
    if (status) setIsPlaying(!isPlaying);
  };

  const handleSkip = async (back?: boolean) => {
    const status = await skip(back);
    if (status) window.location.reload();
  };

  const iconStyle = "h-16 w-16 text-white hover:opacity-80";
  return (
    <div className="absolute flex gap-3 bottom-16 left-1/2 transform -translate-x-1/2">
      <button onClick={() => handleSkip(true)}>
        <IconPlayerTrackPrevFilled className={iconStyle} />
      </button>
      {isPlaying ? (
        <button onClick={handleStopStart}>
          <IconPlayerPauseFilled className={iconStyle} />
        </button>
      ) : (
        <button onClick={handleStopStart}>
          <IconPlayerPlayFilled className={iconStyle} />
        </button>
      )}
      <button onClick={() => handleSkip()}>
        <IconPlayerTrackNextFilled className={iconStyle} />
      </button>
    </div>
  );
}
