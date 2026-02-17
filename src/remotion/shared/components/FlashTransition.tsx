import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface FlashTransitionProps {
  /** The frame at which the flash occurs (peak white) */
  frame: number;
  /** Total duration of the flash in frames (default 10) */
  duration?: number;
  /** Flash color (default white) */
  color?: string;
}

export const FlashTransition: React.FC<FlashTransitionProps> = ({
  frame: flashFrame,
  duration = 10,
  color = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();

  // Flash starts at flashFrame, fades out over duration
  const halfDuration = Math.floor(duration / 2);
  const fadeInStart = flashFrame - halfDuration;
  const fadeOutEnd = flashFrame + halfDuration;

  // Outside the flash window entirely
  if (frame < fadeInStart || frame > fadeOutEnd) {
    return null;
  }

  let opacity: number;

  if (frame <= flashFrame) {
    // Rapid fade in (snap to full white)
    opacity = interpolate(
      frame,
      [fadeInStart, flashFrame],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  } else {
    // Gradual fade out
    opacity = interpolate(
      frame,
      [flashFrame, fadeOutEnd],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};
