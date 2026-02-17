import React from "react";
import { useCurrentFrame } from "remotion";

interface ScreenShakeProps {
  /** Content that will be shaken */
  children: React.ReactNode;
  /** Frame at which the shake begins */
  startFrame: number;
  /** Duration of the shake in frames */
  duration?: number;
  /** Maximum displacement in pixels */
  intensity?: number;
  /** Oscillation frequency multiplier (higher = faster shake) */
  frequency?: number;
}

export const ScreenShake: React.FC<ScreenShakeProps> = ({
  children,
  startFrame,
  duration = 12,
  intensity = 10,
  frequency = 30,
}) => {
  const frame = useCurrentFrame();

  const elapsed = frame - startFrame;

  let translateX = 0;
  let translateY = 0;

  if (elapsed >= 0 && elapsed < duration) {
    // Normalized progress [0, 1]
    const progress = elapsed / duration;

    // Exponential decay — shake dies down smoothly
    const decay = 1 - progress;
    const decayedIntensity = intensity * decay * decay;

    // Oscillating displacement using different frequencies for x and y
    // to avoid a uniform diagonal shake
    translateX =
      Math.sin(elapsed * frequency * 0.7) * decayedIntensity;
    translateY =
      Math.cos(elapsed * frequency * 0.9) * decayedIntensity;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};
