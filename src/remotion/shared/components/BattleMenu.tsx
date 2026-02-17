import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design-tokens";
import { pixelFont } from "../fonts";

interface BattleMenuProps {
  /** Exactly 4 menu option labels */
  options: [string, string, string, string];
  /** Index (0-3) of the currently selected option */
  selectedIndex: number;
  /** Frame at which the menu appears */
  startFrame?: number;
  /** Width of the menu box */
  width?: number;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({
  options,
  selectedIndex,
  startFrame = 0,
  width = 400,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  const scaleProgress = spring({
    frame: elapsed,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.6 },
  });

  // Don't render before start frame
  if (frame < startFrame) {
    return null;
  }

  // Cursor arrow blinks every 20 frames
  const cursorVisible = Math.floor(frame / 20) % 2 === 0 || elapsed < 15;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        right: 60,
        width,
        transform: `scale(${scaleProgress})`,
        transformOrigin: "bottom right",
        opacity: scaleProgress,
        zIndex: 40,
      }}
    >
      {/* Outer border */}
      <div
        style={{
          border: `4px solid ${COLORS.rpgBorder}`,
          borderRadius: 4,
          padding: 3,
        }}
      >
        {/* Inner border */}
        <div
          style={{
            border: `2px solid ${COLORS.rpgBorderDark}`,
            borderRadius: 2,
            backgroundColor: "rgba(26, 26, 46, 0.95)",
            padding: 24,
          }}
        >
          {/* 2x2 grid layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 16,
            }}
          >
            {options.map((option, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  {/* Arrow cursor */}
                  <span
                    style={{
                      fontFamily: pixelFont,
                      fontSize: 20,
                      color: COLORS.rpgWhite,
                      width: 24,
                      opacity: isSelected && cursorVisible ? 1 : 0,
                    }}
                  >
                    {">"}
                  </span>

                  {/* Option text */}
                  <span
                    style={{
                      fontFamily: pixelFont,
                      fontSize: 18,
                      color: isSelected ? COLORS.white : COLORS.rpgWhite,
                      textTransform: "uppercase",
                      textShadow: isSelected
                        ? `0 0 6px ${COLORS.rpgBorder}`
                        : "none",
                    }}
                  >
                    {option}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
