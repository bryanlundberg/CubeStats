import { ScrambleDisplay } from "../scramble-display";
import { useTimerStore } from "@/store/timerStore";

export default function ScrambleModal() {
  const { zoomInScramble, setZoomInScramble, scramble, selectedCube } =
    useTimerStore();

  return (
    <>
      {zoomInScramble ? (
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-transparent"
          onClick={() => setZoomInScramble(false)}
        >
          <ScrambleDisplay
            className="w-full h-[30rem] mx-auto"
            show={true}
            event={selectedCube ? selectedCube.category : "3x3"}
            scramble={scramble}
          />
        </div>
      ) : null}
    </>
  );
}
