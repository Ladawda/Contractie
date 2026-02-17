import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design-tokens";

type DialogPosition = "bottom" | "center" | "top";

interface RPGDialogBoxProps {
  /** Content rendered inside the dialog box */
  children: React.ReactNode;
  /** Frame at which the dialog box begins its entrance */
  startFrame?: number;
  /** Width of the dialog box in pixels */
  width?: number;
  /** Vertical position on screen */
  position?: DialogPosition;
  /** Optional speaker name displayed at the top of the box */
  speakerName?: string;
}

const positionStyles: Record<DialogPosition, React.CSSProperties> = {
  bottom: {
    position: "absolute",
    bottom: 80,
    left: "50%",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  top: {
    position: "absolute",
    top: 120,
    left: "50%",
  },
};

export const RPGDialogBox: React.FC<RPGDialogBoxProps> = ({
  children,
  startFrame = 0,
  width = 920,
  position = "bottom",
  speakerName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  // Slide up from bottom with spring
  const slideProgress = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.7 },
  });

  const translateY = position === "bottom" ? (1 - slideProgress) * 120 : 0;
  const translateYCenter = position === "center" ? -50 : 0;
  const scale = position !== "bottom" ? slideProgress : 1;
  const opacity = slideProgress;

  // Don't render before start frame
  if (frame < startFrame) {
    return null;
  }

  return (
    <div
      style={{
        ...positionStyles[position],
        transform: `translateX(-50%) translateY(${translateYCenter}%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        width,
        zIndex: 50,
      }}
    >
      {/* Outer border */}
      <div
        style={{
          border: `4px solid ${COLORS.rpgBorder}`,
          borderRadius: 4,
          padding: 4,
        }}
      >
        {/* Inner border */}
        <div
          style={{
            border: `2px solid ${COLORS.rpgBorderDark}`,
            borderRadius: 2,
            backgroundColor: "rgba(26, 26, 46, 0.92)",
            backdropFilter: "blur(6px)",
            padding: 32,
            position: "relative",
          }}
        >
          {/* Speaker name plate */}
          {speakerName && (
            <div
              style={{
                position: "absolute",
                top: -16,
                left: 24,
                backgroundColor: COLORS.rpgDarkBg,
                border: `2px solid ${COLORS.rpgBorder}`,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 4,
                paddingBottom: 4,
                borderRadius: 2,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: COLORS.rpgGreen,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {speakerName}
              </span>
            </div>
          )}

          {/* Dialog content */}
          <div
            style={{
              minHeight: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
