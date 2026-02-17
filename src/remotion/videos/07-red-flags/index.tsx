import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { COLORS } from "../../shared/design-tokens";
import { bodyFont } from "../../shared/fonts";
import { EndCard } from "../../shared/components/EndCard";
import { CounterAnimation } from "../../shared/components/CounterAnimation";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const RED_FLAGS = [
  "Paying $300 for a lead that ghosted me",
  "Platform takes 20% AFTER I already paid for the lead",
  "Same lead sold to 5 other contractors",
  "$65/lead just to get a 'maybe'",
  "Annual spend: $12,000 in fees alone",
  "Customer thinks I charge too much (it's the platform fees)",
  "'Boost your profile' = pay more to see your own leads",
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single red flag card with spring entrance from bottom. */
const RedFlagCard: React.FC<{
  text: string;
  enterProgress: number;
  exitProgress: number;
}> = ({ text, enterProgress, exitProgress }) => {
  const translateY = interpolate(enterProgress, [0, 1], [600, 0]);
  const opacity = interpolate(enterProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Exit: slide up and fade out
  const exitY = interpolate(exitProgress, [0, 1], [0, -500]);
  const exitOpacity = interpolate(exitProgress, [0, 0.6], [1, 0], {
    extrapolateRight: "clamp",
  });

  const finalY = translateY + exitY;
  const finalOpacity = opacity * exitOpacity;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: "50%",
        transform: `translateY(calc(-50% + ${finalY}px))`,
        opacity: finalOpacity,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.darkCard,
          borderLeft: `6px solid ${COLORS.destructive}`,
          borderRadius: 16,
          padding: "48px 44px",
          boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(239,68,68,0.08)`,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.35,
            display: "block",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

/** Mini red flag card for the stacking scene. */
const MiniRedFlagCard: React.FC<{
  text: string;
  index: number;
  totalCards: number;
  compressProgress: number;
}> = ({ text, index, totalCards, compressProgress }) => {
  const spacing = interpolate(compressProgress, [0, 1], [160, 78]);
  const yPos = 180 + index * spacing;
  const scale = interpolate(compressProgress, [0, 1], [1, 0.72]);
  const cardOpacity = interpolate(compressProgress, [0, 1], [0.9, 0.85]);

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        top: yPos,
        transform: `scale(${scale})`,
        transformOrigin: "center top",
        opacity: cardOpacity,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.darkCard,
          borderLeft: `4px solid ${COLORS.destructive}`,
          borderRadius: 10,
          padding: "16px 20px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.white,
            lineHeight: 1.3,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------

const RedFlags: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------------------------------
  // Scene 1: Hook - "My lead fees as red flags" (frames 0-60)
  // -----------------------------------------------------------------------
  const hookScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  const hookOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const hookExitOpacity = interpolate(frame, [48, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle red pulse glow on hook text
  const hookGlow = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.15, 0.4]
  );

  // -----------------------------------------------------------------------
  // Scene 2: Rapid-fire red flag cards (frames 60-390)
  // -----------------------------------------------------------------------
  const CARD_SECTION_START = 60;
  const FRAMES_PER_CARD = 47; // ~1.57 seconds per card
  const CARD_TRANSITION_FRAMES = 12; // fast transition overlap

  // -----------------------------------------------------------------------
  // Scene 3: The Stack (frames 390-450)
  // -----------------------------------------------------------------------
  const STACK_START = 390;
  const STACK_END = 450;

  const stackProgress =
    frame >= STACK_START
      ? spring({
          frame: Math.max(0, frame - STACK_START),
          fps,
          config: { damping: 14, stiffness: 80, mass: 0.8 },
        })
      : 0;

  // Compress cards animation
  const compressProgress =
    frame >= STACK_START
      ? interpolate(frame, [STACK_START, STACK_START + 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Counter entrance
  const counterEntrance =
    frame >= STACK_START + 20
      ? spring({
          frame: Math.max(0, frame - (STACK_START + 20)),
          fps,
          config: { damping: 12, stiffness: 100, mass: 0.6 },
        })
      : 0;

  const counterY = interpolate(counterEntrance, [0, 1], [60, 0]);
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]);

  // Stack exit
  const stackExitOpacity =
    frame >= STACK_END - 10
      ? interpolate(frame, [STACK_END - 10, STACK_END], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // -----------------------------------------------------------------------
  // Scene 4: The Solution - Green card (frames 450-510)
  // -----------------------------------------------------------------------
  const SOLUTION_START = 450;

  const solutionEntrance =
    frame >= SOLUTION_START
      ? spring({
          frame: Math.max(0, frame - SOLUTION_START),
          fps,
          config: { damping: 12, stiffness: 90, mass: 0.7 },
        })
      : 0;

  const solutionScale = interpolate(solutionEntrance, [0, 1], [0.85, 1]);
  const solutionOpacity = interpolate(solutionEntrance, [0, 1], [0, 1]);
  const solutionY = interpolate(solutionEntrance, [0, 1], [80, 0]);

  // "Be the green flag" tagline entrance (delayed)
  const taglineEntrance =
    frame >= SOLUTION_START + 18
      ? spring({
          frame: Math.max(0, frame - (SOLUTION_START + 18)),
          fps,
          config: { damping: 14, stiffness: 100, mass: 0.5 },
        })
      : 0;

  const taglineY = interpolate(taglineEntrance, [0, 1], [40, 0]);
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);

  // Green glow pulse
  const greenGlow = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.15, 0.35]
  );

  // -----------------------------------------------------------------------
  // Scene 5: End Card (frames 510-600)
  // -----------------------------------------------------------------------
  const END_CARD_START = 510;

  // -----------------------------------------------------------------------
  // Background
  // -----------------------------------------------------------------------
  // Subtle red ambient particles for the red flag scenes
  const showRedParticles = frame < SOLUTION_START;

  const redParticles = Array.from({ length: 16 }).map((_, i) => {
    const speed = 0.4 + (i % 4) * 0.2;
    const baseX = (i * 157) % 1080;
    const baseY = ((i * 283 + frame * speed) % 2200) - 200;
    const drift = Math.sin(frame * 0.03 + i * 1.2) * 30;
    const pOpacity = interpolate(
      Math.sin(frame * 0.04 + i * 0.5),
      [-1, 1],
      [0.03, 0.1]
    );
    return { x: baseX + drift, y: baseY, opacity: pOpacity, size: 3 + (i % 3) };
  });

  // -----------------------------------------------------------------------
  // Determine active scene
  // -----------------------------------------------------------------------
  const showHook = frame < 60;
  const showCards = frame >= CARD_SECTION_START && frame < STACK_START;
  const showStack = frame >= STACK_START && frame < SOLUTION_START;
  const showSolution = frame >= SOLUTION_START && frame < END_CARD_START;
  const showEndCard = frame >= END_CARD_START;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        overflow: "hidden",
      }}
    >
      {/* Ambient red particles */}
      {showRedParticles &&
        redParticles.map((p, i) => (
          <div
            key={`rp-${i}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: COLORS.destructive,
              opacity: p.opacity,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* ================================================================= */}
      {/* SCENE 1: Hook */}
      {/* ================================================================= */}
      {showHook && (
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
            padding: "0 80px",
          }}
        >
          <div
            style={{
              opacity: hookOpacity * hookExitOpacity,
              transform: `scale(${hookScale})`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.white,
                lineHeight: 1.3,
                textShadow: `0 0 40px rgba(239,68,68,${hookGlow}), 0 0 80px rgba(239,68,68,${hookGlow * 0.5})`,
                display: "block",
              }}
            >
              My lead fees as red flags
            </span>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 80,
                display: "block",
                marginTop: 24,
              }}
            >
              {"\uD83D\uDEA9"}
            </span>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 2: Rapid-fire red flag cards */}
      {/* ================================================================= */}
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
          {/* Red flag emoji header */}
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 32,
                fontWeight: 600,
                color: COLORS.gray400,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {"\uD83D\uDEA9"} Red Flags {"\uD83D\uDEA9"}
            </span>
          </div>

          {/* Progress dots */}
          <div
            style={{
              position: "absolute",
              bottom: 140,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              zIndex: 10,
            }}
          >
            {RED_FLAGS.map((_, i) => {
              const cardStart = CARD_SECTION_START + i * FRAMES_PER_CARD;
              const isActive =
                frame >= cardStart &&
                frame < cardStart + FRAMES_PER_CARD;
              const isPast = frame >= cardStart + FRAMES_PER_CARD;

              return (
                <div
                  key={`dot-${i}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? COLORS.destructive
                      : isPast
                        ? COLORS.gray600
                        : COLORS.darkCardBorder,
                    transition: "background-color 0.1s",
                    boxShadow: isActive
                      ? `0 0 8px ${COLORS.destructive}`
                      : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Cards */}
          {RED_FLAGS.map((flag, i) => {
            const cardStart = CARD_SECTION_START + i * FRAMES_PER_CARD;
            const cardEnd = cardStart + FRAMES_PER_CARD;

            // Only render cards that are visible or transitioning
            if (frame < cardStart - 5 || frame > cardEnd + CARD_TRANSITION_FRAMES) {
              return null;
            }

            const enterProgress = spring({
              frame: Math.max(0, frame - cardStart),
              fps,
              config: { damping: 14, stiffness: 180, mass: 0.5 },
            });

            const exitProgress =
              frame >= cardEnd - CARD_TRANSITION_FRAMES
                ? spring({
                    frame: Math.max(0, frame - (cardEnd - CARD_TRANSITION_FRAMES)),
                    fps,
                    config: { damping: 16, stiffness: 200, mass: 0.4 },
                  })
                : 0;

            return (
              <RedFlagCard
                key={`flag-${i}`}
                text={`\uD83D\uDEA9 ${flag}`}
                enterProgress={enterProgress}
                exitProgress={exitProgress}
              />
            );
          })}

          {/* Card counter */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              right: 80,
              zIndex: 10,
            }}
          >
            {(() => {
              const currentCard = Math.min(
                Math.floor((frame - CARD_SECTION_START) / FRAMES_PER_CARD),
                RED_FLAGS.length - 1
              );
              return (
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.gray600,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {currentCard + 1}/{RED_FLAGS.length}
                </span>
              );
            })()}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 3: The Stack */}
      {/* ================================================================= */}
      {showStack && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: stackExitOpacity,
          }}
        >
          {/* Stack header */}
          <div
            style={{
              position: "absolute",
              top: 90,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: stackProgress,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.destructive,
                letterSpacing: 1,
              }}
            >
              Every. Single. One.
            </span>
          </div>

          {/* Stacked mini cards */}
          {RED_FLAGS.map((flag, i) => (
            <MiniRedFlagCard
              key={`stack-${i}`}
              text={`\uD83D\uDEA9 ${flag}`}
              index={i}
              totalCards={RED_FLAGS.length}
              compressProgress={compressProgress}
            />
          ))}

          {/* Total cost counter */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: counterOpacity,
              transform: `translateY(${counterY}px)`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                border: `2px solid ${COLORS.destructive}`,
                borderRadius: 16,
                padding: "28px 52px",
                boxShadow: `0 0 40px rgba(239,68,68,0.15)`,
              }}
            >
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  fontWeight: 500,
                  color: COLORS.gray400,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Total annual cost:
              </span>
              <CounterAnimation
                from={0}
                to={12600}
                startFrame={STACK_START + 20}
                endFrame={STACK_START + 45}
                prefix="$"
                suffix="+"
                fontSize={64}
                color={COLORS.destructive}
                fontFamily={bodyFont}
                fontWeight={800}
                useCommas
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 4: The Solution */}
      {/* ================================================================= */}
      {showSolution && (
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
            padding: "0 60px",
            background: `radial-gradient(ellipse at center, rgba(13,148,136,${greenGlow * 0.3}) 0%, ${COLORS.darkBg} 70%)`,
          }}
        >
          {/* Green solution card */}
          <div
            style={{
              opacity: solutionOpacity,
              transform: `scale(${solutionScale}) translateY(${solutionY}px)`,
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.darkCard,
                borderLeft: `6px solid ${COLORS.guildTeal}`,
                borderRadius: 16,
                padding: "52px 44px",
                boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(13,148,136,0.12)`,
              }}
            >
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 46,
                  fontWeight: 700,
                  color: COLORS.white,
                  lineHeight: 1.4,
                  display: "block",
                }}
              >
                {"\u2705"} Guild: $25/mo.{"\n"}
                <br />
                No lead fees.{"\n"}
                <br />
                No commissions.{"\n"}
                <br />
                <span style={{ color: COLORS.guildTeal }}>Keep 100%.</span>
              </span>
            </div>
          </div>

          {/* "Be the green flag" tagline */}
          <div
            style={{
              marginTop: 48,
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 44,
                fontWeight: 700,
                color: COLORS.guildGold,
                letterSpacing: 1,
                textShadow: `0 0 30px rgba(245,158,11,0.3)`,
              }}
            >
              Be the green flag.
            </span>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 5: End Card (frames 510-600) */}
      {/* ================================================================= */}
      {showEndCard && (
        <Sequence from={END_CARD_START} layout="none">
          <EndCard ctaText="$25/mo forever — First 100 founding members" />
        </Sequence>
      )}

      {/* Vignette overlay (except end card) */}
      {!showEndCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default RedFlags;
