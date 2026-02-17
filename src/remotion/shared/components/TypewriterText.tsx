import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../design-tokens";
import { terminalFont } from "../fonts";

interface TypewriterTextProps {
  /** Full text to reveal character by character */
  text: string;
  /** Frame at which the typewriter effect begins */
  startFrame: number;
  /** Characters revealed per frame (default 0.5 = 1 char every 2 frames) */
  charsPerFrame?: number;
  /** Font family override */
  fontFamily?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Text color */
  color?: string;
  /** Show blinking cursor at end */
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  charsPerFrame = 0.5,
  fontFamily,
  fontSize = 36,
  color,
  showCursor = true,
}) => {
  const frame = useCurrentFrame();

  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(
    Math.floor(elapsed * charsPerFrame),
    text.length
  );

  const visibleText = text.substring(0, charsToShow);
  const isComplete = charsToShow >= text.length;

  // Cursor blinks every 15 frames (on for 15, off for 15)
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;
  const showBlinkingCursor = showCursor && (cursorVisible || !isComplete);

  // Don't render anything before start frame
  if (frame < startFrame) {
    return null;
  }

  return (
    <div
      style={{
        display: "inline",
      }}
    >
      <span
        style={{
          fontFamily: fontFamily ?? terminalFont,
          fontSize,
          color: color ?? COLORS.rpgWhite,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {visibleText}
      </span>
      {showBlinkingCursor && (
        <span
          style={{
            fontFamily: fontFamily ?? terminalFont,
            fontSize,
            color: color ?? COLORS.rpgWhite,
            opacity: cursorVisible ? 1 : 0,
          }}
        >
          _
        </span>
      )}
    </div>
  );
};
