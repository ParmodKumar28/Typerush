"use client";

import useSound from "use-sound";

export function useTypingSounds(enabled: boolean = true) {
  const [playKey] = useSound("/sounds/key.mp3", {
    volume: 0.15,
    soundEnabled: enabled,
  });

  const [playWrong] = useSound("/sounds/wrong.mp3", {
    volume: 0.2,
    soundEnabled: enabled,
  });

  const [playComplete] = useSound("/sounds/complete.mp3", {
    volume: 0.25,
    soundEnabled: enabled,
  });

  return {
    playKey,
    playWrong,
    playComplete,
  };
}
