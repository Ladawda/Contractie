import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../design-tokens";
import { bodyFont } from "../fonts";

interface CounterAnimationProps {
  /** Starting number */
  from: number;
  /** Ending number */
  to: number;
  /** Frame at which the counter starts animating */
  startFrame: number;
  /** Frame at which the counter reaches the target value */
  endFrame: number;
  /** Prefix displayed before the number (e.g. "$") */
  prefix?: string;
  /** Suffix displayed after the number (e.g. "/mo", "%") */
  suffix?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Text color */
  color?: string;
  /** Font family override */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: number;
  /** Format with commas for thousands */
  useCommas?: boolean;
  /** Number of decimal places (default 0) */
  decimals?: number;
}

function formatWithCommas(n: number, decimals: number): string {
  if (decimals > 0) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.floor(n).toLocaleString("en-US");
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  from,
  to,
  startFrame,
  endFrame,
  prefix = "",
  suffix = "",
  fontSize = 72,
  color,
  fontFamily,
  fontWeight = 700,
  useCommas = true,
  decimals = 0,
}) => {
  const frame = useCurrentFrame();

  const currentValue = interpolate(
    frame,
    [startFrame, endFrame],
    [from, to],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const displayValue = useCommas
    ? formatWithCommas(currentValue, decimals)
    : decimals > 0
      ? currentValue.toFixed(decimals)
      : String(Math.floor(currentValue));

  return (
    <span
      style={{
        fontFamily: fontFamily ?? bodyFont,
        fontSize,
        fontWeight,
        color: color ?? COLORS.white,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: -1,
      }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
