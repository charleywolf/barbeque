import { Dispatch, SetStateAction } from "react";

import { Slider } from "@/components/ui/slider";
import { saveVolume } from "@/lib/actions/controls";

export default function Volume({
  volume,
  setVolume,
}: {
  volume: number | null;
  setVolume: Dispatch<SetStateAction<number | null>>;
}) {
  const changeHandler = (volume: [number]) => {
    volume[0] && setVolume(volume[0]);
  };

  const saveHandler = () => {
    volume && saveVolume(volume);
  };

  if (volume)
    return (
      <Slider
        orientation="horizontal"
        value={[volume]}
        max={100}
        className="absolute w-[80%] max-w-sm bottom-8 left-1/2 transform -translate-x-1/2"
        step={5}
        onValueChange={changeHandler}
        onPointerUp={saveHandler}
      />
    );
  else return <></>;
}
