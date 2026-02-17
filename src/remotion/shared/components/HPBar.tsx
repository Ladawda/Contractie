import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../design-tokens";
import { pixelFont } from "../fonts";

interface HPBarProps {
  /** Current value (will animate toward this if drain is used) */
  current: number;
  /** Maximum value */
  max: number;
  /** Label text displayed above the bar (e.g. "HP", "CASH RESERVES") */
  label?: string;
  /** Base color override — if omitted, color is derived from percentage */
  color?: string;
  /** Frame at which the drain animation starts */
  startFrame?: number;
  /** Frame at which the drain animation ends */
  endFrame?: number;
  /** Starting value for drain animation (defaults to max) */
  startValue?: number;
  /** Width of the entire bar in pixels */
  width?: number;
  /** Height of the bar in pixels */
  height?: number;
}

/**
 * Returns a color based on percentage remaining:
 * 100-60% green, 60-30% yellow, 30-0% red
 */
function getHealthColor(percentage: number): string {
  if (percentage > 60) return COLORS.rpgGreen;
  if (percentage > 30) return COLORS.rpgYellow;
  return COLORS.rpgRed;
}

/**
 * Format a number with commas for thousands
 */
function formatNumber(n: number): string {
  return Math.floor(n).toLocaleString("en-US");
}

export const HPBar: React.FC<HPBarProps> = ({
  current,
  max,
  label = "HP",
  color,
  startFrame = 0,
  endFrame,
  startValue,
  width = 600,
  height = 40,
}) => {
  const frame = useCurrentFrame();

  // Determine the displayed value
  const from = startValue ?? max;
  let displayValue: number;

  if (endFrame !== undefined && endFrame > startFrame) {
    displayValue = interpolate(
      frame,
      [startFrame, endFrame],
      [from, current],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  } else {
    displayValue = frame >= startFrame ? current : from;
  }

  const percentage = max > 0 ? (displayValue / max) * 100 : 0;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const barColor = color ?? getHealthColor(clampedPercentage);

  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 6 }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: pixelFont,
            fontSize: 16,
            color: COLORS.rpgWhite,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: pixelFont,
            fontSize: 14,
            color: COLORS.rpgWhite,
          }}
        >
          {formatNumber(displayValue)} / {formatNumber(max)}
        </span>
      </div>

      {/* Bar container */}
      <div
        style={{
          width: "100%",
          height,
          border: `3px solid ${COLORS.rpgBorder}`,
          borderRadius: 2,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          position: "relative",
          overflow: "hidden",
          boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.5)`,
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${clampedPercentage}%`,
            backgroundColor: barColor,
            borderRadius: 1,
            transition: "background-color 0.1s",
            boxShadow: `0 0 8px ${barColor}80`,
          }}
        />

        {/* Percentage text centered inside bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: pixelFont,
              fontSize: Math.max(12, height * 0.4),
              color: COLORS.white,
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            {Math.floor(clampedPercentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};
