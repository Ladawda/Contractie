import React from "react";

type Sprite = (string | null)[][];

interface PixelCanvasProps {
  sprite: Sprite;
  /** Size of each pixel in CSS pixels. Default: 8 */
  pixelSize?: number;
  /** Optional additional styles on the wrapper */
  style?: React.CSSProperties;
}

/**
 * CSS-grid based pixel art renderer.
 * Each cell in the 2D sprite array becomes a colored <div>.
 * null values render as transparent cells.
 */
export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  sprite,
  pixelSize = 8,
  style,
}) => {
  const rows = sprite.length;
  const cols = sprite[0]?.length ?? 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, ${pixelSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        imageRendering: "pixelated",
        ...style,
      }}
    >
      {sprite.flatMap((row, y) =>
        row.map((color, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: color ?? "transparent",
            }}
          />
        )),
      )}
    </div>
  );
};

/**
 * Performance-oriented sprite renderer using a single <div> with box-shadow.
 * Each non-transparent pixel becomes one box-shadow entry.
 * Far fewer DOM nodes than PixelCanvas for complex sprites.
 */
export const BoxShadowSprite: React.FC<PixelCanvasProps> = ({
  sprite,
  pixelSize = 8,
  style,
}) => {
  const rows = sprite.length;
  const cols = sprite[0]?.length ?? 0;

  const shadows: string[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = sprite[y][x];
      if (color) {
        // box-shadow offsets are relative to the element's position.
        // We use (x+1) and (y+1) because the first shadow at 0,0 would
        // overlap the element itself. We offset the container to compensate.
        shadows.push(`${x * pixelSize}px ${y * pixelSize}px 0 0 ${color}`);
      }
    }
  }

  return (
    <div
      style={{
        width: cols * pixelSize,
        height: rows * pixelSize,
        position: "relative",
        imageRendering: "pixelated",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: pixelSize,
          height: pixelSize,
          boxShadow: shadows.join(", "),
          // The element itself is invisible; only the shadows show.
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};
