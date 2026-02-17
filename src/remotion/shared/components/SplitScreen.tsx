import React from "react";
import {
  AbsoluteFill,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, DIMENSIONS } from "../design-tokens";

interface SplitScreenProps {
  /** Content rendered on the left half */
  leftContent: React.ReactNode;
  /** Content rendered on the right half */
  rightContent: React.ReactNode;
  /** Background color for the left panel */
  leftColor?: string;
  /** Background color for the right panel */
  rightColor?: string;
  /** Frame at which the split screen slides in */
  startFrame?: number;
  /** Whether to show a divider line between panels */
  showDivider?: boolean;
  /** Left panel label displayed at the top */
  leftLabel?: string;
  /** Right panel label displayed at the top */
  rightLabel?: string;
}

const HALF_WIDTH = DIMENSIONS.width / 2; // 540px

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftContent,
  rightContent,
  leftColor,
  rightColor,
  startFrame = 0,
  showDivider = true,
  leftLabel,
  rightLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  // Left panel slides in from the left
  const leftSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const leftX = interpolate(leftSpring, [0, 1], [-HALF_WIDTH, 0]);

  // Right panel slides in from the right (slightly delayed)
  const rightSpring = spring({
    frame: Math.max(0, elapsed - 3),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const rightX = interpolate(rightSpring, [0, 1], [HALF_WIDTH, 0]);

  // Divider fades in after both panels arrive
  const dividerOpacity = interpolate(
    elapsed,
    [8, 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) {
    return null;
  }

  return (
    <AbsoluteFill>
      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: HALF_WIDTH,
          height: DIMENSIONS.height,
          backgroundColor: leftColor ?? COLORS.rpgDarkBg,
          transform: `translateX(${leftX}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {leftLabel && (
          <div
            style={{
              padding: 32,
              paddingBottom: 16,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.white,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {leftLabel}
            </span>
          </div>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {leftContent}
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: HALF_WIDTH,
          width: HALF_WIDTH,
          height: DIMENSIONS.height,
          backgroundColor: rightColor ?? COLORS.rpgMidBg,
          transform: `translateX(${rightX}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {rightLabel && (
          <div
            style={{
              padding: 32,
              paddingBottom: 16,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.white,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {rightLabel}
            </span>
          </div>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {rightContent}
        </div>
      </div>

      {/* Center divider */}
      {showDivider && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: HALF_WIDTH - 2,
            width: 4,
            height: DIMENSIONS.height,
            backgroundColor: COLORS.rpgBorder,
            opacity: dividerOpacity,
            boxShadow: `0 0 12px ${COLORS.rpgBorder}80`,
            zIndex: 10,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
