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
import { pixelFont, terminalFont } from "../../shared/fonts";
import { BoxShadowSprite } from "../../shared/pixel-art/PixelCanvas";
import {
  EXCLAMATION_SPRITE,
  COIN_SPRITE,
  STAR_SPRITE,
} from "../../shared/pixel-art/ui-elements";
import {
  EndCard,
  RPGDialogBox,
  TypewriterText,
  BattleMenu,
  FlashTransition,
} from "../../shared/components";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface QuestData {
  title: string;
  reward: string;
  rating: string;
}

const QUESTS: QuestData[] = [
  { title: "Kitchen Remodel", reward: "$12,000", rating: "4.8" },
  { title: "Roof Repair", reward: "$8,500", rating: "4.8" },
  { title: "Bathroom Renovation", reward: "$15,000", rating: "4.8" },
  { title: "Electrical Panel Upgrade", reward: "$3,200", rating: "4.8" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single quest entry on the quest board. */
const QuestEntry: React.FC<{
  quest: QuestData;
  slideProgress: number;
  isHighlighted: boolean;
  frame: number;
}> = ({ quest, slideProgress, isHighlighted, frame }) => {
  const translateX = interpolate(slideProgress, [0, 1], [1100, 0]);
  const opacity = interpolate(slideProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse when highlighted
  const glowPulse = isHighlighted
    ? interpolate(Math.sin(frame * 0.12), [-1, 1], [0.2, 0.5])
    : 0;

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        backgroundColor: isHighlighted
          ? "rgba(255, 215, 0, 0.12)"
          : "rgba(26, 26, 46, 0.8)",
        border: isHighlighted
          ? `3px solid ${COLORS.rpgYellow}`
          : `2px solid ${COLORS.rpgBorder}`,
        borderRadius: 8,
        padding: 24,
        marginBottom: 18,
        boxShadow: isHighlighted
          ? `0 0 24px rgba(255, 215, 0, ${glowPulse}), inset 0 0 12px rgba(255, 215, 0, 0.06)`
          : "0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: pixelFont,
            fontSize: 20,
            color: isHighlighted ? COLORS.rpgYellow : COLORS.rpgWhite,
            textShadow: isHighlighted
              ? "0 0 8px rgba(255, 215, 0, 0.5)"
              : "none",
            flex: 1,
          }}
        >
          {quest.title}
        </span>
      </div>

      {/* Reward + rating row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Coin + reward */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <BoxShadowSprite sprite={COIN_SPRITE} pixelSize={4} />
          <span
            style={{
              fontFamily: terminalFont,
              fontSize: 30,
              color: COLORS.rpgYellow,
              fontWeight: "bold",
              textShadow: "0 0 6px rgba(255, 215, 0, 0.3)",
            }}
          >
            {quest.reward}
          </span>
        </div>

        {/* Star rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <BoxShadowSprite sprite={STAR_SPRITE} pixelSize={3} />
          <span
            style={{
              fontFamily: terminalFont,
              fontSize: 24,
              color: COLORS.rpgYellow,
            }}
          >
            {quest.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------

const NewQuest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------------------------------
  // Background
  // -----------------------------------------------------------------------
  const bgShift = interpolate(frame, [0, 600], [0, 30]);

  // Ambient floating particles
  const ambientParticles = Array.from({ length: 18 }).map((_, i) => {
    const speed = 0.25 + (i % 5) * 0.12;
    const baseX = (i * 137) % 1080;
    const baseY = ((i * 251 + frame * speed) % 2200) - 200;
    const drift = Math.sin(frame * 0.02 + i) * 20;
    const pOpacity = interpolate(
      Math.sin(frame * 0.05 + i * 0.7),
      [-1, 1],
      [0.04, 0.16]
    );
    return {
      x: baseX + drift,
      y: baseY,
      opacity: pOpacity,
      size: 2 + (i % 3),
    };
  });

  // -----------------------------------------------------------------------
  // Scene 1: Quest Notification (frames 0-120)
  // -----------------------------------------------------------------------

  // Exclamation mark bouncing
  const exclamationBounce =
    frame < 120
      ? Math.abs(Math.sin(frame * 0.12)) * 30
      : 0;

  const exclamationScale =
    frame < 10
      ? spring({
          frame,
          fps,
          config: { damping: 8, stiffness: 120, mass: 0.5 },
        })
      : 1;

  const exclamationGlow = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.3, 0.8]
  );

  // -----------------------------------------------------------------------
  // Scene 2: Quest Board (frames 120-300)
  // -----------------------------------------------------------------------

  const questBoardHeaderOpacity =
    frame >= 120
      ? interpolate(frame, [120, 140], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Stagger quest entries
  const questSlideProgress = QUESTS.map((_, i) =>
    frame >= 120
      ? spring({
          frame: Math.max(0, frame - (145 + i * 20)),
          fps,
          config: { damping: 14, stiffness: 100, mass: 0.6 },
        })
      : 0
  );

  // -----------------------------------------------------------------------
  // Scene 3: Quest Details (frames 300-420)
  // -----------------------------------------------------------------------

  // Highlight the first quest at frame 300
  const isQuestHighlighted = frame >= 285 && frame < 420;

  // -----------------------------------------------------------------------
  // Scene 4: Accept Quest (frames 420-510)
  // -----------------------------------------------------------------------

  // "QUEST ACCEPTED!" banner
  const questAcceptedBannerActive = frame >= 450 && frame < 510;

  const bannerDrop =
    frame >= 450
      ? spring({
          frame: Math.max(0, frame - 450),
          fps,
          config: { damping: 10, stiffness: 120, mass: 0.5 },
        })
      : 0;

  const bannerY = interpolate(bannerDrop, [0, 1], [-200, 0]);
  const bannerScale = spring({
    frame: Math.max(0, frame - 452),
    fps,
    config: { damping: 8, stiffness: 100, mass: 0.6 },
  });

  // Celebration particles
  const celebrationParticles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const particleProgress = frame >= 455 ? (frame - 455) / 35 : 0;
    const radius = interpolate(
      Math.min(particleProgress, 1),
      [0, 1],
      [0, 150 + (i % 4) * 50]
    );
    const pOpacity = interpolate(
      Math.min(particleProgress, 1),
      [0, 0.2, 1],
      [0, 1, 0],
      { extrapolateRight: "clamp" }
    );
    return {
      x: 540 + Math.cos(angle) * radius,
      y: 700 + Math.sin(angle) * radius,
      opacity: pOpacity,
      color:
        i % 4 === 0
          ? COLORS.rpgYellow
          : i % 4 === 1
            ? COLORS.rpgGreen
            : i % 4 === 2
              ? COLORS.guildGold
              : COLORS.guildBlue,
      size: 6 + (i % 4) * 3,
    };
  });

  // -----------------------------------------------------------------------
  // Scene checks
  // -----------------------------------------------------------------------
  const showScene1 = frame < 120;
  const showScene2or3 = frame >= 120 && frame < 420;
  const showScene4 = frame >= 420 && frame < 510;
  const showEndCard = frame >= 510;

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
      {/* SCENE 1: Quest Notification (frames 0-120) */}
      {/* =============================================================== */}
      {showScene1 && (
        <>
          {/* Golden "!" exclamation sprite bouncing at top */}
          <div
            style={{
              position: "absolute",
              top: 280 - exclamationBounce,
              left: "50%",
              transform: `translateX(-50%) scale(${exclamationScale})`,
              filter: `drop-shadow(0 0 16px rgba(255, 221, 0, ${exclamationGlow}))`,
              zIndex: 10,
            }}
          >
            <BoxShadowSprite
              sprite={EXCLAMATION_SPRITE}
              pixelSize={8}
            />
          </div>

          {/* Glow ring behind exclamation */}
          <div
            style={{
              position: "absolute",
              top: 260,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255, 221, 0, ${exclamationGlow * 0.3}) 0%, transparent 70%)`,
              pointerEvents: "none",
              zIndex: 5,
            }}
          />

          {/* Dialog box with typewriter text */}
          <RPGDialogBox
            startFrame={15}
            position="center"
            speakerName="QUEST BOARD"
            width={880}
          >
            <TypewriterText
              text="NEW QUEST AVAILABLE!"
              startFrame={20}
              fontSize={38}
              color={COLORS.rpgYellow}
              charsPerFrame={0.8}
            />
            <div style={{ marginTop: 16 }}>
              <TypewriterText
                text="Posted by: Local Homeowner"
                startFrame={55}
                fontSize={26}
                color={COLORS.rpgWhite}
                charsPerFrame={0.6}
              />
            </div>
          </RPGDialogBox>
        </>
      )}

      {/* =============================================================== */}
      {/* SCENES 2-3: Quest Board + Quest Details (frames 120-420) */}
      {/* =============================================================== */}
      {showScene2or3 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            padding: "0 50px",
          }}
        >
          {/* Quest board header */}
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: 36,
              color: COLORS.rpgYellow,
              textAlign: "center",
              marginTop: 100,
              marginBottom: 36,
              textShadow:
                "0 0 16px rgba(255, 215, 0, 0.5), 0 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: 4,
              opacity: questBoardHeaderOpacity,
            }}
          >
            QUEST BOARD
          </div>

          {/* Board container with pixel borders */}
          <div
            style={{
              border: `4px solid ${COLORS.rpgBorder}`,
              borderRadius: 8,
              padding: 4,
              opacity: questBoardHeaderOpacity,
            }}
          >
            <div
              style={{
                border: `2px solid ${COLORS.rpgBorderDark}`,
                borderRadius: 4,
                backgroundColor: "rgba(26, 26, 46, 0.9)",
                padding: 28,
              }}
            >
              {/* Quest entries */}
              {QUESTS.map((quest, i) => (
                <QuestEntry
                  key={quest.title}
                  quest={quest}
                  slideProgress={questSlideProgress[i]}
                  isHighlighted={isQuestHighlighted && i === 0}
                  frame={frame}
                />
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* SCENE 3: Quest Details dialog (frames 300-420) */}
          {/* =============================================================== */}
          {frame >= 300 && frame < 420 && (
            <RPGDialogBox
              startFrame={300}
              position="bottom"
              speakerName="QUEST DETAILS"
              width={920}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <TypewriterText
                  text="QUEST: Kitchen Remodel"
                  startFrame={305}
                  fontSize={30}
                  color={COLORS.rpgYellow}
                  charsPerFrame={1}
                  showCursor={false}
                />
                <TypewriterText
                  text='Reward: $12,000 (you keep 100%)'
                  startFrame={325}
                  fontSize={26}
                  color={COLORS.rpgGreen}
                  charsPerFrame={0.8}
                  showCursor={false}
                />
                <TypewriterText
                  text="No lead fees. No middleman."
                  startFrame={355}
                  fontSize={26}
                  color={COLORS.rpgWhite}
                  charsPerFrame={0.7}
                  showCursor={false}
                />
                <TypewriterText
                  text="Location: 2.3 miles away"
                  startFrame={380}
                  fontSize={26}
                  color={COLORS.rpgWhite}
                  charsPerFrame={0.7}
                />
              </div>
            </RPGDialogBox>
          )}
        </div>
      )}

      {/* Flash transition into Scene 2 */}
      <FlashTransition frame={122} duration={8} />

      {/* =============================================================== */}
      {/* SCENE 4: Accept Quest (frames 420-510) */}
      {/* =============================================================== */}
      {showScene4 && (
        <>
          {/* BattleMenu appears */}
          <Sequence from={420} layout="none">
            <BattleMenu
              options={["ACCEPT", "DECLINE", "INFO", "BACK"]}
              selectedIndex={0}
              startFrame={0}
              width={440}
            />
          </Sequence>

          {/* Dialog: "Will you accept this quest?" */}
          <Sequence from={420} layout="none">
            <RPGDialogBox
              startFrame={0}
              position="center"
              speakerName="QUEST BOARD"
              width={800}
            >
              <TypewriterText
                text="Will you accept this quest?"
                startFrame={3}
                fontSize={30}
                color={COLORS.rpgWhite}
                charsPerFrame={0.8}
              />
            </RPGDialogBox>
          </Sequence>

          {/* Flash on accept at frame 445 */}
          <FlashTransition frame={445} duration={12} color={COLORS.rpgYellow} />

          {/* "QUEST ACCEPTED!" banner */}
          {questAcceptedBannerActive && (
            <>
              {/* Darkened background */}
              <AbsoluteFill
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  zIndex: 45,
                }}
              />

              {/* Banner */}
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
                  zIndex: 50,
                }}
              >
                <div
                  style={{
                    transform: `translateY(${bannerY}px) scale(${bannerScale})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: pixelFont,
                      fontSize: 52,
                      color: COLORS.rpgYellow,
                      textAlign: "center",
                      textShadow:
                        "0 0 24px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.3), 0 4px 8px rgba(0,0,0,0.9)",
                      letterSpacing: 5,
                      lineHeight: 1.4,
                    }}
                  >
                    QUEST
                    <br />
                    ACCEPTED!
                  </div>
                </div>

                {/* Sub-message dialog */}
                <Sequence from={460} layout="none">
                  <div
                    style={{
                      marginTop: 60,
                      opacity: interpolate(
                        frame,
                        [468, 478],
                        [0, 1],
                        {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }
                      ),
                      transform: `translateY(${interpolate(
                        frame,
                        [468, 478],
                        [20, 0],
                        {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }
                      )}px)`,
                    }}
                  >
                    <div
                      style={{
                        border: `3px solid ${COLORS.rpgBorder}`,
                        borderRadius: 8,
                        padding: 4,
                      }}
                    >
                      <div
                        style={{
                          border: `2px solid ${COLORS.rpgBorderDark}`,
                          borderRadius: 4,
                          backgroundColor: "rgba(26, 26, 46, 0.95)",
                          padding: "24px 40px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: terminalFont,
                            fontSize: 32,
                            color: COLORS.rpgGreen,
                            lineHeight: 1.6,
                          }}
                        >
                          Welcome to the Guild, Contractor.
                        </span>
                      </div>
                    </div>
                  </div>
                </Sequence>
              </div>

              {/* Celebration particles */}
              {celebrationParticles.map((p, i) => (
                <div
                  key={`celebrate-${i}`}
                  style={{
                    position: "absolute",
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    borderRadius: i % 2 === 0 ? "50%" : "2px",
                    backgroundColor: p.color,
                    opacity: p.opacity,
                    pointerEvents: "none",
                    zIndex: 55,
                    transform: `rotate(${i * 22.5 + frame * 3}deg)`,
                  }}
                />
              ))}
            </>
          )}
        </>
      )}

      {/* =============================================================== */}
      {/* SCENE 5: End Card (frames 510-600) */}
      {/* =============================================================== */}
      {showEndCard && (
        <Sequence from={510} layout="none">
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

export default NewQuest;
