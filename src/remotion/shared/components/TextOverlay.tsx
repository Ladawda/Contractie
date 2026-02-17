import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../design-tokens";
import { bodyFont } from "../fonts";

type VerticalPosition = "top" | "center" | "bottom";

interface TextOverlayProps {
  /** The text to display */
  text: string;
  /** Frame when the overlay starts appearing */
  startFrame: number;
  /** Frame when the overlay finishes disappearing */
  endFrame: number;
  /** Vertical position of the overlay */
  position?: VerticalPosition;
  /** Font size in pixels */
  fontSize?: number;
  /** Font family override */
  fontFamily?: string;
  /** Additional inline styles for the text */
  style?: React.CSSProperties;
}

const FADE_DURATION = 8; // frames for fade in/out

const positionMap: Record<VerticalPosition, React.CSSProperties> = {
  top: {
    top: 120,
    bottom: "auto",
  },
  center: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  bottom: {
    top: "auto",
    bottom: 120,
  },
};

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  position = "center",
  fontSize = 48,
  fontFamily,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Not visible outside the frame range (with fade buffer)
  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  // Fade in
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + FADE_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out
  const fadeOut = interpolate(
    frame,
    [endFrame - FADE_DURATION, endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  const posStyles = positionMap[position];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          ...posStyles,
          opacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 48,
            paddingRight: 48,
            maxWidth: 900,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: fontFamily ?? bodyFont,
              fontSize,
              fontWeight: 600,
              color: COLORS.white,
              lineHeight: 1.4,
              ...style,
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
