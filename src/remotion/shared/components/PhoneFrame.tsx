import React from "react";
import {
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design-tokens";

interface PhoneFrameProps {
  /** Content rendered inside the phone screen area */
  children: React.ReactNode;
  /** Frame at which the phone scales in */
  startFrame?: number;
  /** Phone frame width */
  width?: number;
  /** Phone frame height */
  height?: number;
}

// Dynamic Island dimensions
const ISLAND_WIDTH = 160;
const ISLAND_HEIGHT = 36;

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  startFrame = 0,
  width = 380,
  height = 780,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  const scaleSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const scale = interpolate(scaleSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(scaleSpring, [0, 1], [0, 1]);

  if (frame < startFrame) {
    return null;
  }

  const bezelPadding = 12;
  const borderRadius = 40;
  const screenRadius = borderRadius - bezelPadding;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Phone body */}
      <div
        style={{
          width,
          height,
          borderRadius,
          border: `3px solid ${COLORS.gray700}`,
          backgroundColor: COLORS.gray900,
          padding: bezelPadding,
          position: "relative",
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 8px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08)
          `,
        }}
      >
        {/* Screen area */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: screenRadius,
            overflow: "hidden",
            position: "relative",
            backgroundColor: COLORS.darkBg,
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: ISLAND_WIDTH,
              height: ISLAND_HEIGHT,
              borderRadius: ISLAND_HEIGHT / 2,
              backgroundColor: COLORS.ink,
              zIndex: 20,
            }}
          />

          {/* Child content */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
