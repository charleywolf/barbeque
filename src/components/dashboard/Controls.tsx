import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
} from "@tabler/icons-react";

import { pauseResume } from "@/lib/actions/controls";
import { useState } from "react";

export default function Controls({ isPlaying }: { isPlaying: boolean }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(isPlaying);

  const handleStopStart = async () => {
    const status = await pauseResume(currentlyPlaying);
    if (status) setCurrentlyPlaying(!currentlyPlaying);
  };

  const iconStyle = "h-16 w-16 text-white";
  return (
    <div className="absolute flex gap-3 bottom-5 left-1/2 transform -translate-x-1/2">
      <button>
        <IconPlayerTrackPrevFilled className={iconStyle} />
      </button>
      {currentlyPlaying ? (
        <button onClick={handleStopStart}>
          <IconPlayerPauseFilled className={iconStyle} />
        </button>
      ) : (
        <button>
          <IconPlayerPlayFilled className={iconStyle} />
        </button>
      )}
      <button>
        <IconPlayerTrackNextFilled className={iconStyle} />
      </button>
    </div>
  );
}
