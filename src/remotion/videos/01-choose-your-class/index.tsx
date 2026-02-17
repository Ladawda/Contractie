import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Sequence,
} from "remotion";

import { COLORS } from "../../shared/design-tokens";
import { pixelFont, terminalFont } from "../../shared/fonts";
import { PixelCanvas } from "../../shared/pixel-art/PixelCanvas";
import {
  PLUMBER_SPRITE,
  ELECTRICIAN_SPRITE,
  ROOFER_SPRITE,
  HANDYMAN_SPRITE,
} from "../../shared/pixel-art/sprites";
import { SWORD_CURSOR, STAR_SPRITE } from "../../shared/pixel-art/ui-elements";
import { EndCard } from "../../shared/components/EndCard";
import { FlashTransition } from "../../shared/components/FlashTransition";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ClassData {
  name: string;
  tagline: string;
  sprite: (string | null)[][];
  stats: { label: string; value: number; color: string }[];
}

const CLASSES: ClassData[] = [
  {
    name: "PLUMBER",
    tagline: "Master of the Pipe",
    sprite: PLUMBER_SPRITE,
    stats: [
      { label: "STR", value: 85, color: "#ff4444" },
      { label: "DEX", value: 70, color: "#44dd44" },
      { label: "INT", value: 75, color: "#4488ff" },
      { label: "CHA", value: 60, color: "#bb66ff" },
    ],
  },
  {
    name: "ELECTRICIAN",
    tagline: "Keeper of the Current",
    sprite: ELECTRICIAN_SPRITE,
    stats: [
      { label: "STR", value: 65, color: "#ff4444" },
      { label: "DEX", value: 80, color: "#44dd44" },
      { label: "INT", value: 90, color: "#4488ff" },
      { label: "CHA", value: 70, color: "#bb66ff" },
    ],
  },
  {
    name: "ROOFER",
    tagline: "Guardian from Above",
    sprite: ROOFER_SPRITE,
    stats: [
      { label: "STR", value: 95, color: "#ff4444" },
      { label: "DEX", value: 75, color: "#44dd44" },
      { label: "INT", value: 60, color: "#4488ff" },
      { label: "CHA", value: 65, color: "#bb66ff" },
    ],
  },
  {
    name: "HANDYMAN",
    tagline: "Jack of All Trades",
    sprite: HANDYMAN_SPRITE,
    stats: [
      { label: "STR", value: 75, color: "#ff4444" },
      { label: "DEX", value: 85, color: "#44dd44" },
      { label: "INT", value: 80, color: "#4488ff" },
      { label: "CHA", value: 90, color: "#bb66ff" },
    ],
  },
];

interface QuestData {
  title: string;
  price: string;
  location: string;
  difficulty: number; // 1-4 stars
}

const QUESTS: QuestData[] = [
  {
    title: "Fix Leaky Faucet",
    price: "$250",
    location: "Phoenix, AZ",
    difficulty: 2,
  },
  {
    title: "Water Heater Install",
    price: "$800",
    location: "Scottsdale, AZ",
    difficulty: 3,
  },
  {
    title: "Bathroom Remodel",
    price: "$3,200",
    location: "Mesa, AZ",
    difficulty: 4,
  },
];

// ---------------------------------------------------------------------------
// Sub-components (all inline in this file)
// ---------------------------------------------------------------------------

/** Animated stats bar that fills to a target percentage. */
const StatBar: React.FC<{
  label: string;
  value: number;
  color: string;
  fillProgress: number; // 0..1
}> = ({ label, value, color, fillProgress }) => {
  const barWidth = interpolate(fillProgress, [0, 1], [0, value], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 3,
      }}
    >
      <span
        style={{
          fontFamily: pixelFont,
          fontSize: 9,
          color: COLORS.rpgWhite,
          width: 32,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 8,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 2,
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </div>
    </div>
  );
};

/** A single class selection card. */
const ClassCard: React.FC<{
  data: ClassData;
  index: number;
  isHighlighted: boolean;
  slideUpProgress: number; // 0..1
  statsFillProgress: number; // 0..1
  compact?: boolean;
}> = ({ data, isHighlighted, slideUpProgress, statsFillProgress, compact }) => {
  const translateY = interpolate(slideUpProgress, [0, 1], [400, 0]);
  const opacity = interpolate(slideUpProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const borderColor = isHighlighted ? COLORS.rpgYellow : COLORS.rpgBorder;
  const glowIntensity = isHighlighted ? 0.4 : 0;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        border: `3px solid ${borderColor}`,
        borderRadius: 12,
        backgroundColor: "rgba(22, 33, 62, 0.95)",
        padding: compact ? 10 : 14,
        width: compact ? 220 : 230,
        boxShadow: isHighlighted
          ? `0 0 20px rgba(255, 215, 0, ${glowIntensity}), inset 0 0 15px rgba(255, 215, 0, 0.08)`
          : "0 4px 16px rgba(0,0,0,0.4)",
        transition: "border-color 0.1s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Sprite */}
      <div style={{ marginBottom: 8 }}>
        <PixelCanvas sprite={data.sprite} pixelSize={compact ? 8 : 9} />
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: pixelFont,
          fontSize: compact ? 12 : 14,
          color: isHighlighted ? COLORS.rpgYellow : COLORS.rpgWhite,
          textAlign: "center",
          marginBottom: 4,
          textShadow: isHighlighted ? "0 0 8px rgba(255,215,0,0.6)" : "none",
        }}
      >
        {data.name}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: terminalFont,
          fontSize: compact ? 14 : 16,
          color: COLORS.gray400,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {data.tagline}
      </div>

      {/* Stats */}
      <div style={{ width: "100%" }}>
        {data.stats.map((stat) => (
          <StatBar
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            fillProgress={statsFillProgress}
          />
        ))}
      </div>
    </div>
  );
};

/** Pixel sword cursor rendered with PixelCanvas. */
const SwordCursor: React.FC<{
  x: number;
  y: number;
  visible: boolean;
}> = ({ x, y, visible }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 50,
        transform: "rotate(-45deg)",
        filter: "drop-shadow(0 0 4px rgba(255,204,0,0.6))",
      }}
    >
      <PixelCanvas sprite={SWORD_CURSOR} pixelSize={5} />
    </div>
  );
};

/** Renders star rating using the STAR_SPRITE. */
const StarRating: React.FC<{
  filled: number;
  total: number;
  pixelSize?: number;
}> = ({ filled, total, pixelSize = 3 }) => {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{ opacity: i < filled ? 1 : 0.2 }}
        >
          <PixelCanvas sprite={STAR_SPRITE} pixelSize={pixelSize} />
        </div>
      ))}
    </div>
  );
};

/** A quest card in the quest board section. */
const QuestCard: React.FC<{
  quest: QuestData;
  index: number;
  slideProgress: number;
  isHighlighted: boolean;
}> = ({ quest, index, slideProgress, isHighlighted }) => {
  const translateX = interpolate(slideProgress, [0, 1], [1200, 0]);
  const opacity = interpolate(slideProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        backgroundColor: isHighlighted
          ? "rgba(245, 235, 200, 0.15)"
          : "rgba(210, 180, 140, 0.08)",
        border: isHighlighted
          ? `3px solid ${COLORS.rpgYellow}`
          : `2px solid ${COLORS.rpgBorder}`,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        boxShadow: isHighlighted
          ? "0 0 24px rgba(255,215,0,0.3), inset 0 0 12px rgba(255,215,0,0.05)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: pixelFont,
          fontSize: 16,
          color: isHighlighted ? COLORS.rpgYellow : COLORS.rpgWhite,
          marginBottom: 10,
          textShadow: isHighlighted ? "0 0 6px rgba(255,215,0,0.5)" : "none",
        }}
      >
        {quest.title}
      </div>

      {/* Details row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: terminalFont,
            fontSize: 24,
            color: COLORS.rpgGreen,
            fontWeight: "bold",
          }}
        >
          {quest.price}
        </span>
        <span
          style={{
            fontFamily: terminalFont,
            fontSize: 18,
            color: COLORS.gray400,
          }}
        >
          {quest.location}
        </span>
      </div>

      {/* Star difficulty */}
      <div style={{ marginTop: 8 }}>
        <StarRating filled={quest.difficulty} total={4} pixelSize={3} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------

const ChooseYourClass: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------------------------------
  // Scene 1: Title reveal (frames 0-30)
  // -----------------------------------------------------------------------
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.6 },
  });

  // Subtle glow pulse on title
  const titleGlow = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.3, 0.8]
  );

  // -----------------------------------------------------------------------
  // Scene 2: Card entrances (frames 30-90)
  // -----------------------------------------------------------------------
  const cardSlideProgress = CLASSES.map((_, i) =>
    spring({
      frame: Math.max(0, frame - (30 + i * 15)),
      fps,
      config: { damping: 12, stiffness: 100, mass: 0.7 },
    })
  );

  // -----------------------------------------------------------------------
  // Scene 3: Cursor bouncing (frames 90-240)
  // -----------------------------------------------------------------------
  const cursorCycleFrame = frame - 90;
  const cursorIndex =
    cursorCycleFrame >= 0 && frame < 240
      ? Math.floor(cursorCycleFrame / 30) % 4
      : -1;

  // Card grid positions (2x2 grid, centered)
  const cardPositions = [
    { x: 108, y: 520 },  // top-left
    { x: 558, y: 520 },  // top-right
    { x: 108, y: 1050 }, // bottom-left
    { x: 558, y: 1050 }, // bottom-right
  ];

  // Cursor position with bounce
  const cursorBounce =
    cursorIndex >= 0
      ? Math.sin(frame * 0.3) * 5
      : 0;

  const cursorPos =
    cursorIndex >= 0
      ? {
          x: cardPositions[cursorIndex].x - 40,
          y: cardPositions[cursorIndex].y + 60 + cursorBounce,
        }
      : { x: -100, y: -100 };

  // Stats fill when card is highlighted
  const getStatsFill = (cardIndex: number) => {
    if (frame < 90) {
      // During entrance, small initial fill
      return interpolate(frame, [30 + cardIndex * 15, 80], [0, 0.3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame >= 90 && frame < 240) {
      // Fill when highlighted by cursor
      if (cursorIndex === cardIndex) {
        const timeSinceHighlight =
          cursorCycleFrame - Math.floor(cursorCycleFrame / 30) * 30;
        return interpolate(timeSinceHighlight, [0, 15], [0.3, 1], {
          extrapolateRight: "clamp",
        });
      }
      return 0.3;
    }
    if (frame >= 240 && cardIndex === 0) return 1;
    return 0.3;
  };

  // -----------------------------------------------------------------------
  // Scene 4: Selection zoom (frames 240-300)
  // -----------------------------------------------------------------------
  const selectionProgress =
    frame >= 240
      ? spring({
          frame: Math.max(0, frame - 245),
          fps,
          config: { damping: 12, stiffness: 80, mass: 0.8 },
        })
      : 0;

  const otherCardsFade =
    frame >= 240
      ? interpolate(frame, [240, 260], [1, 0], {
          extrapolateRight: "clamp",
        })
      : 1;

  // Selected card (Plumber) zooms to center
  const selectedCardScale = interpolate(selectionProgress, [0, 1], [1, 1.15]);

  // -----------------------------------------------------------------------
  // Scene 5: Expanded profile (frames 300-420)
  // -----------------------------------------------------------------------
  const profileEntrance =
    frame >= 300
      ? spring({
          frame: Math.max(0, frame - 300),
          fps,
          config: { damping: 14, stiffness: 100, mass: 0.6 },
        })
      : 0;

  const profileOpacity = interpolate(profileEntrance, [0, 1], [0, 1]);
  const profileSlide = interpolate(profileEntrance, [0, 1], [60, 0]);

  // Profile stats reveal staggered
  const profileStats = [
    { label: "Jobs Completed", value: "847" },
    { label: "5-Star Rating", value: "4.9" },
    { label: "Response Time", value: "< 1hr" },
  ];

  // -----------------------------------------------------------------------
  // Scene 6: "YOUR QUEST AWAITS..." (frames 420-480)
  // -----------------------------------------------------------------------
  const questAwaitsOpacity =
    frame >= 420 && frame < 480
      ? interpolate(frame, [420, 440, 465, 480], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const questAwaitsScale =
    frame >= 420
      ? spring({
          frame: Math.max(0, frame - 420),
          fps,
          config: { damping: 10, stiffness: 60, mass: 0.8 },
        })
      : 0;

  // -----------------------------------------------------------------------
  // Scene 7: Quest board (frames 480-570)
  // -----------------------------------------------------------------------
  const questSlideProgress = QUESTS.map((_, i) =>
    frame >= 480
      ? spring({
          frame: Math.max(0, frame - (485 + i * 15)),
          fps,
          config: { damping: 14, stiffness: 100, mass: 0.6 },
        })
      : 0
  );

  // -----------------------------------------------------------------------
  // Scene 8: Quest accepted (frames 570-630)
  // -----------------------------------------------------------------------
  const questAcceptedActive = frame >= 570 && frame < 630;

  const bannerDrop =
    frame >= 570
      ? spring({
          frame: Math.max(0, frame - 570),
          fps,
          config: { damping: 10, stiffness: 120, mass: 0.5 },
        })
      : 0;

  const bannerY = interpolate(bannerDrop, [0, 1], [-200, 0]);

  // Celebratory particles
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const particleProgress = frame >= 575 ? (frame - 575) / 30 : 0;
    const radius = interpolate(
      Math.min(particleProgress, 1),
      [0, 1],
      [0, 120 + (i % 3) * 40]
    );
    const particleOpacity = interpolate(
      Math.min(particleProgress, 1),
      [0, 0.3, 1],
      [0, 1, 0],
      { extrapolateRight: "clamp" }
    );
    return {
      x: 540 + Math.cos(angle) * radius,
      y: 500 + Math.sin(angle) * radius,
      opacity: particleOpacity,
      color: i % 3 === 0 ? COLORS.rpgYellow : i % 3 === 1 ? COLORS.rpgGreen : COLORS.guildBlue,
      size: 6 + (i % 4) * 2,
    };
  });

  // -----------------------------------------------------------------------
  // Scene 9: Value prop (frames 630-660)
  // -----------------------------------------------------------------------
  const valuePropOpacity =
    frame >= 630 && frame < 660
      ? interpolate(frame, [630, 642, 652, 660], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const valuePropScale =
    frame >= 630
      ? spring({
          frame: Math.max(0, frame - 630),
          fps,
          config: { damping: 12, stiffness: 100, mass: 0.5 },
        })
      : 0;

  // -----------------------------------------------------------------------
  // Background gradient & ambient particles
  // -----------------------------------------------------------------------
  const bgShift = interpolate(frame, [0, 750], [0, 30]);

  // Ambient floating pixel particles
  const ambientParticles = Array.from({ length: 20 }).map((_, i) => {
    const speed = 0.3 + (i % 5) * 0.15;
    const baseX = (i * 137) % 1080;
    const baseY = ((i * 251 + frame * speed) % 2200) - 200;
    const drift = Math.sin(frame * 0.02 + i) * 20;
    const pOpacity = interpolate(
      Math.sin(frame * 0.05 + i * 0.7),
      [-1, 1],
      [0.05, 0.2]
    );
    return { x: baseX + drift, y: baseY, opacity: pOpacity, size: 2 + (i % 3) };
  });

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  // Determine which major scene is active for overall layout
  const showCards = frame < 300;
  const showProfile = frame >= 300 && frame < 480;
  const showQuestSection = frame >= 480 && frame < 660;
  const showEndCard = frame >= 660;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${170 + bgShift}deg, ${COLORS.rpgDarkBg} 0%, ${COLORS.rpgMidBg} 50%, #0d1b3e 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Ambient floating particles */}
      {!showEndCard &&
        ambientParticles.map((p, i) => (
          <div
            key={`ambient-${i}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: COLORS.rpgYellow,
              opacity: p.opacity,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* =============================================================== */}
      {/* SCENE 1: "CHOOSE YOUR CLASS" title */}
      {/* =============================================================== */}
      {frame < 300 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity:
              frame < 240
                ? titleOpacity
                : interpolate(frame, [240, 270], [1, 0], {
                    extrapolateRight: "clamp",
                  }),
            transform: `scale(${titleScale})`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: 42,
              color: COLORS.rpgWhite,
              textAlign: "center",
              textShadow: `0 0 20px rgba(255, 215, 0, ${titleGlow}), 0 0 40px rgba(255, 215, 0, ${titleGlow * 0.4}), 0 2px 4px rgba(0,0,0,0.8)`,
              letterSpacing: 3,
              lineHeight: 1.4,
              padding: "0 40px",
            }}
          >
            CHOOSE YOUR
            <br />
            CLASS
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* SCENE 2-4: Class cards grid (2x2) */}
      {/* =============================================================== */}
      {showCards && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {CLASSES.map((cls, i) => {
            const isSelected = frame >= 240 && i === 0;
            const isOther = frame >= 240 && i !== 0;

            // Grid positions: 2 columns
            const col = i % 2;
            const row = Math.floor(i / 2);
            const baseX = 108 + col * 450;
            const baseY = 320 + row * 530;

            // During selection, animate the plumber card to center
            const posX = isSelected
              ? interpolate(selectionProgress, [0, 1], [baseX, 540 - 115])
              : baseX;
            const posY = isSelected
              ? interpolate(selectionProgress, [0, 1], [baseY, 480])
              : baseY;
            const scale = isSelected ? selectedCardScale : 1;
            const cardOpacity = isOther ? otherCardsFade : 1;

            return (
              <div
                key={cls.name}
                style={{
                  position: "absolute",
                  left: posX,
                  top: posY,
                  transform: `scale(${scale})`,
                  transformOrigin: "center top",
                  opacity: cardOpacity,
                  zIndex: isSelected ? 20 : 1,
                }}
              >
                <ClassCard
                  data={cls}
                  index={i}
                  isHighlighted={
                    cursorIndex === i || (frame >= 240 && i === 0)
                  }
                  slideUpProgress={cardSlideProgress[i]}
                  statsFillProgress={getStatsFill(i)}
                  compact
                />
              </div>
            );
          })}

          {/* Sword cursor */}
          <SwordCursor
            x={cursorPos.x}
            y={cursorPos.y}
            visible={frame >= 90 && frame < 240}
          />
        </div>
      )}

      {/* Flash on selection at frame 250 */}
      <FlashTransition frame={250} duration={12} color={COLORS.rpgYellow} />

      {/* =============================================================== */}
      {/* SCENE 5: Expanded plumber profile */}
      {/* =============================================================== */}
      {showProfile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: profileOpacity,
            transform: `translateY(${profileSlide}px)`,
          }}
        >
          {/* Background panel */}
          <div
            style={{
              backgroundColor: "rgba(22, 33, 62, 0.9)",
              border: `3px solid ${COLORS.rpgYellow}`,
              borderRadius: 16,
              padding: 40,
              width: 800,
              boxShadow:
                "0 0 40px rgba(255,215,0,0.15), inset 0 0 30px rgba(255,215,0,0.04)",
            }}
          >
            {/* Header: "PLUMBER CLASS" */}
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: 36,
                color: COLORS.rpgYellow,
                textAlign: "center",
                marginBottom: 30,
                textShadow: "0 0 12px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,0.8)",
                letterSpacing: 3,
              }}
            >
              PLUMBER CLASS
            </div>

            {/* Sprite centered */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  border: `2px solid ${COLORS.rpgBorder}`,
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <PixelCanvas sprite={PLUMBER_SPRITE} pixelSize={14} />
              </div>
            </div>

            {/* Stats detail cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {profileStats.map((stat, i) => {
                const statEntrance =
                  frame >= 310
                    ? spring({
                        frame: Math.max(0, frame - (310 + i * 10)),
                        fps,
                        config: { damping: 14, stiffness: 120, mass: 0.5 },
                      })
                    : 0;

                const statSlide = interpolate(statEntrance, [0, 1], [50, 0]);
                const statOpacity = interpolate(statEntrance, [0, 1], [0, 1]);

                return (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      padding: "14px 20px",
                      border: `1px solid ${COLORS.rpgBorder}44`,
                      transform: `translateX(${statSlide}px)`,
                      opacity: statOpacity,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: terminalFont,
                        fontSize: 26,
                        color: COLORS.gray400,
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      style={{
                        fontFamily: pixelFont,
                        fontSize: 22,
                        color: COLORS.rpgGreen,
                        textShadow: "0 0 8px rgba(0,255,65,0.4)",
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stats bars at bottom */}
            <div style={{ marginTop: 24, padding: "0 20px" }}>
              {CLASSES[0].stats.map((stat) => (
                <StatBar
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                  fillProgress={1}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* SCENE 6: "YOUR QUEST AWAITS..." overlay */}
      {/* =============================================================== */}
      {frame >= 420 && frame < 480 && (
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
            zIndex: 30,
            opacity: questAwaitsOpacity,
          }}
        >
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: 48,
              color: COLORS.rpgYellow,
              textAlign: "center",
              textShadow:
                "0 0 20px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 8px rgba(0,0,0,0.8)",
              letterSpacing: 4,
              transform: `scale(${questAwaitsScale})`,
              lineHeight: 1.5,
            }}
          >
            YOUR QUEST
            <br />
            AWAITS...
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* SCENE 7-8: Quest board */}
      {/* =============================================================== */}
      {showQuestSection && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            padding: "0 60px",
          }}
        >
          {/* Quest board header */}
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: 32,
              color: COLORS.rpgYellow,
              textAlign: "center",
              marginTop: 160,
              marginBottom: 40,
              textShadow: "0 0 12px rgba(255,215,0,0.4), 0 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: 3,
              opacity: interpolate(frame, [480, 495], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            QUEST BOARD
          </div>

          {/* Wooden board background */}
          <div
            style={{
              backgroundColor: "rgba(60, 35, 15, 0.6)",
              border: `3px solid ${COLORS.rpgBorder}`,
              borderRadius: 16,
              padding: 30,
              boxShadow:
                "inset 0 0 30px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.5)",
              flex: 1,
              maxHeight: 1100,
            }}
          >
            {/* Plumber mini-profile at top */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
                paddingBottom: 20,
                borderBottom: `1px solid ${COLORS.rpgBorder}44`,
                opacity: interpolate(frame, [482, 492], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  border: `2px solid ${COLORS.rpgBorder}`,
                  borderRadius: 6,
                  padding: 6,
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <PixelCanvas sprite={PLUMBER_SPRITE} pixelSize={5} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: pixelFont,
                    fontSize: 16,
                    color: COLORS.rpgYellow,
                  }}
                >
                  PLUMBER
                </div>
                <div
                  style={{
                    fontFamily: terminalFont,
                    fontSize: 18,
                    color: COLORS.rpgGreen,
                    marginTop: 2,
                  }}
                >
                  Level 42 -- Phoenix, AZ
                </div>
              </div>
            </div>

            {/* Quest cards */}
            {QUESTS.map((quest, i) => (
              <QuestCard
                key={quest.title}
                quest={quest}
                index={i}
                slideProgress={questSlideProgress[i]}
                isHighlighted={questAcceptedActive && i === 0}
              />
            ))}
          </div>

          {/* QUEST ACCEPTED banner */}
          {questAcceptedActive && (
            <div
              style={{
                position: "absolute",
                top: bannerY + 750,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                zIndex: 40,
              }}
            >
              <div
                style={{
                  fontFamily: pixelFont,
                  fontSize: 40,
                  color: COLORS.rpgYellow,
                  backgroundColor: "rgba(0, 0, 0, 0.85)",
                  border: `4px solid ${COLORS.rpgYellow}`,
                  borderRadius: 12,
                  padding: "20px 50px",
                  textShadow:
                    "0 0 16px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3)",
                  boxShadow:
                    "0 0 30px rgba(255,215,0,0.3), 0 8px 24px rgba(0,0,0,0.6)",
                  letterSpacing: 4,
                }}
              >
                QUEST ACCEPTED!
              </div>
            </div>
          )}

          {/* Celebration particles */}
          {questAcceptedActive &&
            particles.map((p, i) => (
              <div
                key={`particle-${i}`}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y + 200,
                  width: p.size,
                  height: p.size,
                  borderRadius: i % 2 === 0 ? "50%" : "2px",
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  pointerEvents: "none",
                  transform: `rotate(${i * 30 + frame * 3}deg)`,
                }}
              />
            ))}
        </div>
      )}

      {/* Flash transition into quest board */}
      <FlashTransition frame={482} duration={8} />

      {/* =============================================================== */}
      {/* SCENE 9: Value proposition */}
      {/* =============================================================== */}
      {frame >= 630 && frame < 660 && (
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
            zIndex: 30,
          }}
        >
          <div
            style={{
              opacity: valuePropOpacity,
              transform: `scale(${valuePropScale})`,
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: 28,
                color: COLORS.rpgWhite,
                lineHeight: 2,
                textShadow: "0 0 12px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              No lead fees.
            </div>
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: 28,
                color: COLORS.rpgWhite,
                lineHeight: 2,
                textShadow: "0 0 12px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              No commissions.
            </div>
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: 36,
                color: COLORS.rpgGreen,
                lineHeight: 2,
                marginTop: 10,
                textShadow: "0 0 16px rgba(0,255,65,0.5), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              $25/mo
            </div>
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* SCENE 10: End card (frames 660-750) */}
      {/* =============================================================== */}
      {showEndCard && (
        <Sequence from={660} layout="none">
          <EndCard rpgStyle ctaText="First 100 contractors: $25/mo forever" />
        </Sequence>
      )}

      {/* Scanline overlay for retro feel */}
      {!showEndCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
            pointerEvents: "none",
            zIndex: 60,
          }}
        />
      )}

      {/* Vignette */}
      {!showEndCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
            pointerEvents: "none",
            zIndex: 55,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default ChooseYourClass;
